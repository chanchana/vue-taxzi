<template>
  <div>
    <div v-if="isForm">
      <!-- Content -->
      <div class="content">
        <b-row>
          <b-col cols="2">
            <fa @click="$router.push('/home')" style="margin:14px 0px 0px;color:blue;font-size:20px" icon="chevron-left" />
          </b-col>
          <b-col cols="8" style="text-align:center;">
            <span class="taxzi-text-gradient title">Create</span>
          </b-col>
          <b-col cols="2"></b-col>
        </b-row>
      </div>

      <div class="form-box">
        <h6 style="text-align:left;">Starting point & Destination</h6>
        <div>
          <input v-model="form.from" class="input-top" type="text" placeholder="Starting Point">
        </div> 
        <div>
          <input v-model="form.to" class="input-bottom" type="text" placeholder="Destination">
        </div>
        <div style="height:40px"/>
        <h6 style="text-align:left;">Appointment</h6>

        <input v-model="form.appointment" class="input-round" type="datetime-local" placeholder="Starting Point">
        <div style="height:60px"/>
        <!-- {{form}} -->
        <div class="input-round" style="display:flex;text-align:center;margin:auto;">
          Maximun Members
          <div style="display:flex;">
            <div @click="tapMinusMax" class="mini-button" style="margin-left:30px"><fa icon="minus"/></div>
            <div style="margin:0px 10px"><b>{{form.max}}</b></div>
            <div @click="tapPlusMax" class="mini-button"><fa icon="plus"/></div>
          </div>
        </div>
        <div style="height:20px"/>

        <div class="input-round" style="display:flex;text-align:center;margin:auto;">
          Taxi Service
          <div style="display:flex;">
            <div style="margin:0px 20px 0px 94px;"><b>{{form.service}}</b></div>
            <div class="mini-button"><fa icon="chevron-down"/></div>
          </div>
        </div>
        <div style="height:40px"/>
        <div @click="tapDone" class="taxzi-button" style="height:50px;margin:auto">
          Done
        </div>

        <b-modal id="success-modal" centered hide-header hide-footer no-close-on-backdrop>
          <div style="padding:24px" class="custom-font">
            <h1><b>Success!</b></h1>
            <p>
              Your new party has been created. You can access your party from your home page.
            </p>
            <button class="taxzi-button" @click="$router.push('/home')">
              Home
            </button>
          </div>
          </b-modal>
      </div>
    </div>
  </div>
</template>

<script>

import DateTimePicker from "nuxt-ctk-date-time-picker"

export default {
  components: {
    DateTimePicker,
  },
  data() {
    return {
      isForm: true,
      form: {
        from: 'KMUTT',
        to: 'Mitr',
        appointment: '2020-02-02T00:03',
        max: 4,
        service: 'None',
      },
      user: '',
    }
  },
  mounted() {
    this.$bvModal.hide('success-modal')
    const user = this.$store.state.user
    if(!user) {this.$router.push('/user/login')}
    this.user = user
  },
  methods: {
    tapPlusMax() {
      this.form.max += 1
      if(this.form.max > 9) {this.form.max = 9}
    },
    tapMinusMax() {
      this.form.max -= 1
      if(this.form.max < 2) {this.form.max = 2}
    },
    tapDone() {
      this.$axios.$post(`http://localhost:9999/users/${this.user._id}/createparty`, this.form).then(res => {
        if(!res.status) {
          alert(res.error)
        } else {
          this.$bvModal.show('success-modal')
        }
      })
    }
  }
};
</script>

<style scoped>
.content {
  padding: 20px 20px 20px 20px;
}
.title {
  font-size: 30px;
  font-weight: 700;
}
.form-box {
  position: absolute;
  text-align: center;
  bottom: 0px;
  padding: 50px 46px;
  width:100%;
  margin: 100px 0px 0px;
  background-color: white;
  border-radius: 30px 30px 0px 0px;
  -webkit-box-shadow: 0px 11px 143px -20px rgba(0,0,0,0.6);
  -moz-box-shadow: 0px 11px 143px -20px rgba(0,0,0,0.6);
  box-shadow: 0px 11px 143px -20px rgba(0,0,0,0.6);
}
.input-top {
  background-color: rgb(233, 233, 233);
  border: none;
  border-radius: 20px 20px 0px 0px;
  color: black;
  height:44px;
  width:300px;
  padding: 20px;
  border-bottom: 1px solid rgb(209, 209, 209);
}
.input-bottom {
  background-color: rgb(233, 233, 233);
  border: none;
  border-radius: 0px 0px 20px 20px;
  color: black;
  height:44px;
  width:300px;
  padding: 20px;
  border-top: 1px solid rgb(209, 209, 209);
}
.input-round {
  background-color: rgb(233, 233, 233);
  border: none;
  border-radius: 30px;
  color: black;
  height:44px;
  width:300px;
  padding: 10px 0px 10px 20px;
}
.mini-button {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  margin-top: -8px;
  padding: 10px 0px;
  color: orangered;
}
</style>