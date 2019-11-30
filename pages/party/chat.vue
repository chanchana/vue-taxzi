<template>
  <div class="bg">
    <Loading v-if="isLoading" />
    <ChatNav :from="navFrom" :to="navTo"/>
    <!-- {{$store.state}} -->
    <!-- <TypeBar /> -->
    <div class="message-area">
      <div v-for="c in chat">
        <ChatBubbleNone v-if="c.userid == ''" :message="c.message" />
        <ChatBubbleLeft v-if="c.userid != userid && c.userid != ''" :name="c.name" :message="c.message" />
        <ChatBubbleRight v-if="c.userid == userid" :name="c.name" :message="c.message" />
      </div>
    </div>
    <div class="messages-box"></div>

    <div class="type-bar">
      <b-row class="text-center">
        <b-col cols="1" style="padding:5px 0px 0px 15px"><fa icon="plus"></fa></b-col>
        <b-col>
          <b-input-group>
            <b-form-input class="taxzi-form" style="height:40px" v-model="message" placeholder="Message..."></b-form-input>
            <b-input-group-append style="height:40px;background-color:rgb(223, 223, 223);border-radius:0px 999px 999px 0px;">
              <b-button class="taxzi-form-button" variant="link" @click="sendMessage"><fa icon="paper-plane"></fa></b-button>
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
import ChatBubbleNone from "~/components/chat/ChatBubbleNone.vue";
import Loading from "~/components/Loading.vue"

export default {
  components: {
    ChatNav,
    Loading,
    ChatBubbleLeft,
    ChatBubbleRight,
    ChatBubbleNone,
  },
  data() {
    return {
      isLoading: false,
      chatData: {},
      chat: [{userid:'', message:''}, {userid:'', message:''}, {userid:'', message:''}],
      name: "",
      message: "",
      navFrom: '',
      navTo: '',
      chatid: '',
      userid: ''
    };
  },
  mounted() {
    this.isLoading = true
    const party = this.$store.state.party
    const user = this.$store.state.user

    this.isLoading = false
    if(!user) {this.$router.push('/user/login')}
    if(!party) {this.$router.push('/home')}
    this.navFrom = party.from
    this.navTo = party.to
    this.userid = user._id

    this.isLoading = true

    this.$axios.$get(`http://taxzi.herokuapp.com/parties/${party._id}/chat`).then(res => {
      if(!res.status) {
        this.isLoading = false
        alert(res.error)
        this.$router.push('/home')
      } else {
        const chatid = res.data._id
        this.chatid = chatid

        this.socket = this.$nuxtSocket({
          name: "chat",
          reconnection: true,
          transports: ['websocket'],
        });
    
        this.socket.on("connect", () => {
          // connected
          this.socket.on("chat-response", msg => {
            console.log(msg)
            console.log(this.chatid)
            if(msg.chatid == this.chatid) {
              console.log('ADDDDD')
              this.addMessage(msg)
            }
          })
          this.socket.on("chat-error", msg => {
            console.log(msg)
            alert(msg.message)
          })
        })
    
        this.$axios.$get('http://taxzi.herokuapp.com/chats/' + chatid).then(response => {
            // console.log(response.data)
            this.isLoading = false
            this.chatData = response.data
            const messages = response.data.messages
            var i
            for(i=0; i<messages.length; i++) {
              // console.log(messages[i])
              this.addMessage(messages[i])
            }
          })
      }
    })

  },
  methods: {
    sendMessage() {
      if (this.message != '') {
        console.log("Sent");
        this.socket.emit("chat-event", {
          chatid: this.chatid,
          userid: this.userid,
          message: this.message
        });
        this.message = "";
      }
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
}
.taxzi-form-button {
  background-color: rgb(223, 223, 223);
  border: none;
  border-radius: 999px;
  font-size: 18px;
  color: rgb(255, 145, 0);
  padding: 10px;
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
  width: 100%;
  z-index: 10;
  vertical-align:middle;
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
  padding: 120% 10px 90px 10px;
  bottom: 0px;
  width: 100%;
  z-index: -1;
  display: flex;
  flex-direction: column-reverse;
}
</style>