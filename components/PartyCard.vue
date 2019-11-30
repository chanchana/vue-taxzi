<template>
  <div v-if="infoData">
    <b-modal ref="my-modal" size="sm" centered hide-footer hide-header header-close>
      <div class="d-block text-left custom-font">
        <b-container class="bv-example-row">
          <button @click="hideModal" class="btn2" style="display:inline;">
            <fa icon="times" />
          </button>
          <b-row>
            <b-col style="font-size:10px; float:left>">
              FROM &nbsp;&nbsp;
              <b style="font-size:25px;">{{infoData.from}}</b>
            </b-col>
          </b-row>

          <b-row>
            &nbsp;
            <b-col>
              <fa style="font-size:15px; color:gray; padding:1px 1px 1px 0px;" icon="arrow-down" />
            </b-col>
          </b-row>
          <b-row>
            &nbsp;
            <b-col style="font-size:10px;">
              TO &nbsp;&nbsp;&nbsp;&nbsp;
              <b style="font-size:25px;">{{infoData.to}}</b>
            </b-col>
          </b-row>
          <b-row>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b-col>
              <p style="font-size:12px; color:gray; float:left; ">
                <b style="color:black;">
                  {{infoData.appointment.split('T')[0]}}
                  <fa style="font-size:3px; margin-top:1px;" icon="circle" />
                  {{infoData.appointment.split('T')[1]}}
                </b>
                <!-- <fa style="font-size:3px; color:gray; margin-top:1px;" icon="circle"/> By {{infoData.service}}   -->
                <!-- <b style="color:#FF69B4;" v-if="infoData.lady"><fa style="font-size:3px; color:#FF69B4; margin-top:1px;" icon="circle"/> LADY</b></p> -->
              </p>
            </b-col>
          </b-row>
          <br />
          <b-row>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <b-col style="font-size:11px; float:left>">Currently Active</b-col>
          </b-row>
          <b-row>
            <PartyMember
              :memberInfo="infoData.members"
              :numberMember="infoData.members.length"
              :numberMax="infoData.max"
            />
          </b-row>
        </b-container>
      </div>
      <br />
      <!-- {{isJoined}}, {{userid}}, {{infoData.members}} -->
      <b-button
        v-if="isJoined"
        class="rectangle-join custom-font"
        block
        @click="$router.push('/party/chat')"
      >
        <b style="font-size:28px; color:white;">
          <fa icon="comment-alt" style="font-size:20px; color:white; padding:0px 0px 2px 0px;" />Chat
        </b>
      </b-button>
      <b-button v-if="!isJoined" class="rectangle-join custom-font" block @click="tapJoin">
        <b style="font-size:28px; color:white;">
          <fa icon="user-plus" style="font-size:20px; color:white; padding:0px 0px 2px 0px;" />Join
        </b>
      </b-button>
    </b-modal>

    <b-modal id="success-modal" centered hide-header hide-footer no-close-on-backdrop>
      <div style="padding:24px;text-align:center;" class="custom-font">
        <h1 style="text-align:left;">
          <b>Joined!</b>
        </h1>
        <p
          style="text-align:left;"
        >Now you can communicate with other members in your party.</p>
        <button class="taxzi-button" style="width:70%" @click="$router.push('/home')">Home</button>
      </div>
    </b-modal>

    <button @click="showModal" class="rectangle" style="padding:16px 12px 2px 12px">
      <b-container class="bv-example-row">
        <b-row>
          &nbsp;&nbsp;
          <b style="font-size:18px;">
            {{infoData.from}}
            <fa style="font-size:14px;color:gray;padding:0px 0px 3px 0px" icon="arrow-right" />
            {{infoData.to}}
          </b>
        </b-row>
        <b-row>
          &nbsp;&nbsp;
          <!-- <div v-if="infoData.lady" style="font-size:12px; color:#FF69B4;" ><fa icon="female" /></div>&nbsp; -->
          <p style="font-size:12px; float:left; ">
            {{infoData.members.length}}/{{infoData.max}} - {{infoData.appointment.split('T')[0]}}
            <b>
              <fa style="font-size:3px; margin-top:1px;" icon="circle" />
            </b>
            {{infoData.appointment.split('T')[1]}}
          </p>
          <b-col></b-col>
          <b-col></b-col>
          <b-col>
            <fa
              style="width: 20px; height: 20px; float:right;color:rgba(255, 107, 48, 1.0); display:inline;margin:-14px -10px 0px 0px"
              icon="angle-right"
            />
          </b-col>
        </b-row>
      </b-container>
    </button>
  </div>
</template>

<script>
import PartyMember from "~/components/PartyMember.vue";

export default {
  components: {
    PartyMember
  },
  props: {
    infoData: Object,
    userid: String
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    isJoined() {
      if (this.infoData) {
        for (var i = 0; i < this.infoData.members.length; i++) {
          if (this.userid == this.infoData.members[i]._id) {
            return true;
          }
        }
      }
      return false;
    }
  },
  methods: {
    showModal() {
      this.$store.commit("setparty", this.infoData);
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$store.commit("clearparty");
      this.$refs["my-modal"].hide();
    },
    tapJoin() {
      const userid = this.userid;
      const partyid = this.infoData._id;

      this.$axios
        .$post(`https://taxzi.herokuapp.com/users/${userid}/joinparty/${partyid}`)
        .then(res => {
          if (!res.status) {
            alert(res.error)
          } else {
            this.$bvModal.show('success-modal')
          }
        })
    }
  }
};
</script>

<style>
.modal-content {
  border-radius: 35px;
  background-color: #f1f1f1;
  margin: 25px;
  width: 88%;
}
.btn2 {
  background-color: #f1f1f1;
  border: none;
  color: rgb(107, 104, 104);
  float: right;
  margin-top: 0px;
  margin-right: 3px;
  padding: 0px 2px;
  font-size: 24px;
  cursor: pointer;
}


  #rcorners1 {
    font-color        : rgba(129, 129, 129, 1.0);
    font-size         : 14px;
    margin-top        : 0px;
    margin-right      : 40px;
    margin-left       : 40px;
    border-radius     : 70px;
    border            : 0px;
    background        : rgba(228, 228, 228, 1.0);
    padding           : 25px; 
    width             : 285px;
    height            : 10px;    
  }

  .iconfilter {
  background-color    : rgba(255,255,255,0.0);
  color               : rgba(255, 107, 48, 1.0);
  top                 : 156px;
  height              : 20px;
  width               : 20px;
  position            : absolute;
  margin              : 50px;
  left                : 225px;
  -ms-transform       : rotate(0deg); /* IE 9 */
  -webkit-transform   : rotate(0deg); /* Chrome, Safari, Opera */
  transform           : rotate(0deg);
  }
.iconsearch{
  background-color    : rgba(255,255,255,0.0);
  top                 : 135px;
  height              : 23px;
  width               : 23px;
  position            : absolute;
  margin              : 0;
  left                : 288px;
  -ms-transform       : rotate(0deg); /* IE 9 */
  -webkit-transform   : rotate(0deg); /* Chrome, Safari, Opera */
  transform           : rotate(0deg);
  }
.rectangle{
  width               : 300px;
  padding             : 13px;
  background          : #FAFAFA;
  border-radius       : 20px;
  border              : 10px;
  margin-top          : 15px;
  margin-right        : 30px;
  margin-left         : 30px;
  box-shadow: 5px 5px 15px 5px rgba(228, 228, 228, 1.0);
  transition-duration: 0.4s;
  cursor: pointer;
}
.rectangle:hover {background-color: #e7e7e7;}

.rectangle-member{
  width               : 215px;
  padding             : 13px;
  background          : #FAFAFA;
  border-radius       : 20px;
  border              : 10px;
  margin-top          : 0px;
  margin-right        : 30px;
  margin-left         : 30px;
  transition-duration: 0.4s;
  cursor: pointer;
}
.rectangle-member:hover {background-color: #e7e7e7;}

.rectangle-join{
  width               : 140px;
  padding             : 5px;
  background          : rgba(255, 107, 48, 0.9);
  border-radius       : 60px;
  border              : 10px;
  float               : left;    
  margin-top          : 0px;
  margin-bottom       : 10px;
  margin-right        : 10px;
  margin-left         : 10px;
  box-shadow: 5px 5px 30px 1px rgba(255, 107, 48, 0.7);
  transition-duration: 0.4s;
  cursor: pointer;
}
.rectangle-join:hover {background-color: rgba(255, 107, 48, 1.0);}

.rectangle-each-member{
  width               : 310px;
  padding             : 13px;
  background          : #FAFAFA;
  border-radius       : 20px;
  border              : 10px;
  margin-top          : 15px;
  margin-right        : 30px;
  margin-left         : 33px;
  box-shadow: 5px 5px 30px 1px rgb(0, 0, 0,0.1);
  transition-duration: 0.4s;
  cursor: pointer;
}

.rectangle-each-member:hover {background-color: rgba(255, 107, 48, 0.9);}

.rectangle-filter{
  width               : 250px;
  padding             : 13px;
  background          : #FAFAFA;
  border-radius       : 20px;
  border              : 10px;
  margin-top          : 15px;
  margin-right        : 20px;
  margin-left         : 14px;
  box-shadow: 5px 5px 30px 1px rgb(0, 0, 0,0.1);
  transition-duration: 0.4s;
  cursor: pointer;
}

.rectangle-filter:hover {background-color: rgba(255, 107, 48, 0.9);}

.rectangle-done{
  width               : 130px;
  padding             : 5px;
  background          : rgba(255, 107, 48, 0.9);
  border-radius       : 60px;
  border              : 10px;
  float               : left;    
  margin-top          : 0px;
  margin-bottom       : 10px;
  margin-right        : 50px;
  margin-left         : 75px;
  box-shadow: 5px 5px 30px 1px rgba(255, 107, 48, 0.7);
  transition-duration: 0.4s;
  cursor: pointer;
}
.rectangle-done:hover {background-color: rgba(255, 107, 48, 1.0);}


</style>