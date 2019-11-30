<template>
<div>
  <Loading v-if="isLoading"/>
  <div style="padding:120px 20px 20px 20px;text-align:center;">
    <img src="~/static/TaxziLogoGradient.png" style="height:80px">
    <div
      style="padding:64px 38px 10px;font-size:14px;text-align:left"
    >Please enter a valid KMUTT student or staff username (ID, Email) and password</div>
    <div class="d-flex justify-content-center">
      <form class="form-horizontal" action method>
        <!-- Username -->
        <div class="control-group row pt-3">
          <!-- <label class="control-label col-5" for="inputUsername">Username</label> -->
          <input
            class="taxzi-form"
            type="text"
            name="inputUsername"
            id="inputUsername"
            placeholder="Username"
            v-model="form.username"
          />
        </div>
        <!-- Password -->
        <div class="control-group row pt-3">
          <!-- <label class="control-label col-5" for="inputPassword">Password</label> -->
          <input
            class="taxzi-form"
            type="password"
            name="inputPassword"
            id="inputPassword"
            placeholder="Password"
            v-model="form.password"
          />
        </div>
      </form>
    </div>
    <button
      @click="tapNext"
      class="taxzi-button"
      style="margin:24px 0px 10px"
    >Next</button>
    <div style="padding:18px 38px 24px;font-size:14px;text-align:left">
      If you already have Taxzi account, you can
      <a @click="$router.push('/user/login')" style="color:rgb(255, 107, 48); font-weight:700;">Login</a>
    </div>
  </div>
</div>
</template>

<script>
import Loading from "~/components/Loading.vue"

export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      form: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    tapNext() {
      this.isLoading = true
      this.$axios.$post('http://taxzi.herokuapp.com/register', {
        username: this.form.username,
        password: this.form.password,
      }).then(res => {
        if(!res.status) {
          this.$axios.$post('http://taxzi.herokuapp.com/login', {
          username: this.form.username,
          password: this.form.password,
          }).then(res => {
            if(res.status) {
              this.$store.commit('setuser', res.data)
              this.isLoading = false
              this.$router.push('/home')
            }
          })
          this.isLoading = false
          alert(res.error)
        } else {
          this.$store.commit('setuser', res.data)
          this.isLoading = false
          this.$router.push('/user/registerprofile')
        }
      })
    }
  }
}
</script>

<style scoped>
.bg {
  background-color: whitesmoke;
  padding: 0%;
  min-height: 100%;
  height: 100%;
}
</style>