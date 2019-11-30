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
        .$post(`http://localhost:9999/users/${userid}/joinparty/${partyid}`)
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
</style>