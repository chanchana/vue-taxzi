<template>
  <div v-if="infoData">
    <b-modal ref="my-modal" size="sm" centered hide-footer hide-header header-close>
      <div class="d-block text-left custom-font" >
        <b-container class="bv-example-row">
          <button @click="hideModal" class="btn2" style="display:inline;"><fa icon="times"/></button>
          <b-row>
            <b-col style="font-size:10px; float:left>">FROM &nbsp;&nbsp;<b style="font-size:25px;">{{infoData.start}}</b></b-col>
          </b-row>
          
          <b-row>
            &nbsp;<b-col><fa style="font-size:15px; color:gray; padding:1px 1px 1px 0px;" icon="arrow-down"/></b-col>
          </b-row>
          <b-row>
            &nbsp;<b-col style="font-size:10px;">TO &nbsp;&nbsp;&nbsp;&nbsp;<b style="font-size:25px;">{{infoData.destination}}</b></b-col>
          </b-row>
          <b-row>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b-col>
              <p style="font-size:12px; color:gray; float:left; "><b style="color:black;">{{infoData.date}} <fa style="font-size:3px; margin-top:1px;" icon="circle"/> {{infoData.time}}</b> <fa style="font-size:3px; color:gray; margin-top:1px;" icon="circle"/> By {{infoData.service}}  <b style="color:#FF69B4;" v-if="infoData.lady"><fa style="font-size:3px; color:#FF69B4; margin-top:1px;" icon="circle"/> LADY</b></p>
            </b-col>
          </b-row>
          <br>
          <b-row>
            &nbsp;&nbsp;&nbsp;&nbsp;<b-col style="font-size:11px; float:left>">Currently Active</b-col>
          </b-row>
          <b-row>
            <PartyMember :memberInfo="infoData.members" :numberMember="infoData.members.length" :numberMax="infoData.max" />
          </b-row>
        </b-container>
      </div>
      <br>
      <!-- {{isJoined}}, {{userid}}, {{infoData.members}} -->
      <b-button v-if="isJoined" class="rectangle-join custom-font" block @click="hideModal"><b style="font-size:28px; color:white;"><fa icon="chat" style="font-size:16px; color:white; padding:0px 0px 2px 0px;"/> Chat</b></b-button>
      <b-button v-if="!isJoined" class="rectangle-join custom-font" block @click="hideModal"><b style="font-size:28px; color:white;"><fa icon="user-plus" style="font-size:16px; color:white; padding:0px 0px 2px 0px;"/> Join</b></b-button>

    </b-modal>
    <button @click="showModal" class="rectangle">
      <b-container class="bv-example-row">
        <b-row >
          &nbsp;&nbsp;<b style="font-size:18px;">{{infoData.start}} <fa style="font-size:14px;color:gray;padding:0px 0px 3px 0px" icon="arrow-right"/> {{infoData.destination}}</b>
        </b-row>
        <b-row >
          &nbsp;&nbsp;<div v-if="infoData.lady" style="font-size:12px; color:#FF69B4;" ><fa icon="female" /></div>&nbsp;
          <p style="font-size:12px; float:left; ">{{infoData.members.length}}/{{infoData.max}} - {{infoData.date}} <b><fa style="font-size:3px; margin-top:1px;" icon="circle"/></b> {{infoData.time}}</p>
          <b-col></b-col>
          <b-col></b-col>
          <b-col><fa style="width: 20px; height: 20px; float:right;color:rgba(255, 107, 48, 1.0); display:inline;" icon="angle-right"/></b-col>
        </b-row>
      </b-container>
      
    </button>
  </div>
</template>

<script>
import PartyMember from "~/components/PartyMember.vue"


export default {
  components:{
    PartyMember,
  },
  props: {
    infoData: Object,
    userid: String,
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    isJoined() {
      if(this.infoData) {
        for(var i = 0;i < this.infoData.members.length; i++) {
          if(this.userid == this.infoData.members[i]._id) {
            return true
          }
        }
      }
      return false
    }
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    }
  }
};
</script>

<style>
.modal-content {
  border-radius      :35px;
  background-color: #F1F1F1;
  margin: 25px;
  width: 88%;
}
.btn2 {
    background-color:  #F1F1F1;
    border: none;
    color: rgb(107, 104, 104);
    float: right;
    margin-top:0px;
    margin-right:3px;
    padding: 0px 2px;
    font-size: 24px;
    cursor: pointer;
    }

</style>