<template>
  <div class="bg">
    <ChatNav />
    <!-- <TypeBar /> -->


    <div class="message-area" id="mbox">
      <!-- <div style="height:220px"></div> -->
      <div v-for="c in chat">
        <p>{{c.name}}: {{c.msg}}</p>
      </div>
    </div>
    <div class="messages-box">
    </div>

    <div class="type-bar">
      <b-row class="text-center">
        <b-col cols="1">+</b-col>
        <b-col>
          <b-input-group>
            <b-form-input v-model="msg" placeholder="Message..."></b-form-input>
            <b-input-group-append>
              <b-button @click="sendMessage">Send</b-button>
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
export default {
  components: {
    ChatNav,
    TypeBar
  },
  data() {
    return {
      chat: [],
      name: "",
      msg: ""
    };
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: "chat",
      reconnection: false
    });

    this.socket.on("connect", () => {
      this.socket.emit("chat-event", {
        msg: "User Connected"
      });
      this.socket.on("chat-response", msg => {
        console.log(msg);
        this.chat.push(msg);
        var element = document.getElementById("mbox");
        console.log(element.scrollTop)
        console.log(element.scrollHeight)
        element.scrollTop = element.scrollHeight
      });
    });
  },
  methods: {
    sendMessage() {
      console.log("Sent");
      this.socket.emit("chat-event", {
        name: this.name,
        msg: this.msg
      });
      this.msg = ""
    },
  }
};
</script>

<style scoped>
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
  background-color: whitesmoke;

}
.message-area {
  position: absolute;
  overflow: auto;
  max-height: 100%;
  padding: 130px 10px 120px 10px;
  bottom: 0px;
  width: 100%;
  z-index: -1;
}
</style>