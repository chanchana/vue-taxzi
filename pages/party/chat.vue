<template>
  <div class="bg">
    <ChatNav />
    <!-- <TypeBar /> -->
    <b-form-input v-model="chatid" placeholder="CHATID"></b-form-input>
    <b-form-input v-model="userid" placeholder="USERID"></b-form-input>

    <div class="message-area">
      <div v-for="c in chat">
        <ChatBubbleLeft v-if="c.userid != userid" :name="c.name" :message="c.message" />
        <ChatBubbleRight v-if="c.userid == userid" :name="c.name" :message="c.message" />
      </div>
    </div>
    <div class="messages-box"></div>

    <div class="type-bar">
      <b-row class="text-center">
        <b-col cols="1">+</b-col>
        <b-col>
          <b-input-group>
            <b-form-input class="taxzi-form" v-model="message" placeholder="Message..."></b-form-input>
            <b-input-group-append>
              <b-button class="taxzi-form-button" @click="sendMessage">Send</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import ChatNav from "~/components/chat/ChatNav.vue";
import TypeBar from "~/components/chat/TypeBar.vue";
import ChatBubbleLeft from "~/components/chat/ChatBubbleLeft.vue";
import ChatBubbleRight from "~/components/chat/ChatBubbleRight.vue";

export default {
  components: {
    ChatNav,
    TypeBar,
    ChatBubbleLeft,
    ChatBubbleRight,
  },
  data() {
    return {
      chatData: {},
      chat: [],
      name: "",
      message: "",
      chatid: "5dde529b3dc19a0c80455a95",
      userid: "5ddd6af91a14aec5d2ea1ec6"
    };
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: "chat",
      reconnection: true,
      transports: ['websocket'],
    });

    this.socket.on("connect", () => {
      // connected
      this.socket.on("chat-response", msg => {
        console.log(msg)
        this.addMessage(msg)
      })
      this.socket.on("chat-error", msg => {
        console.log(msg)
        alert(msg.message)
      })
    })

    this.$axios.$get('http://taxzi.herokuapp.com/chats/' + this.chatid).then(response => {
        // console.log(response.data)
        this.chatData = response.data
        const messages = response.data.messages
        var i
        for(i=0; i<messages.length; i++) {
          // console.log(messages[i])
          this.addMessage(messages[i])
        }
      })
  },
  methods: {
    sendMessage() {
      console.log("Sent");
      this.socket.emit("chat-event", {
        chatid: this.chatid,
        userid: this.userid,
        message: this.message
      });
      this.message = "";
    },
    addMessage(message) {
      message['name'] = this.getName(message.userid)
      this.chat.unshift(message)
    },
    getName(userid) {
      const members = this.chatData.party.members
      while (!members) {}

      for(var i = 0; i<members.length; i++) {
        if (members[i]._id == userid) {
          return members[i].name
        }
      }
      return 'NAMEERROR'
    }
  }
};
</script>

<style scoped>
.taxzi-form {
  background-color: rgb(223, 223, 223);
  border: none;
  border-radius: 999px;
  color: black;
  text-decoration-color: azure;
}
.taxzi-form-button {
  background-color: white;
  border-radius: 999px;
  color: cornflowerblue;
}
.bg {
  background-color: whitesmoke;
  padding: 0%;
  min-height: 100%;
  height: 100%;
}
.type-bar {
  position: absolute;
  padding: 20px;
  bottom: 0px;
  height: 80px;
  z-index: 10;
}
.messages-box {
  position: absolute;
  padding: 20px;
  bottom: 0px;
  min-height: 100%;
  width: 100%;
  padding: 125px 15px 95px 15px;
  z-index: -2;
  background-color:rgb(243, 243, 243);
}
.message-area {
  position: absolute;
  overflow: auto;
  max-height: 100%;
  padding: 330px 10px 90px 10px;
  bottom: 0px;
  width: 100%;
  z-index: -1;
  display: flex;
  flex-direction: column-reverse;
}
</style>