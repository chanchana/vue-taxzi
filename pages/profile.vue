<template>
  <div style="">
    <div style="padding: 34px">
      <span class="title taxzi-text-gradient">Profile</span>
      <div class="profile-picture">
        <fa style="font-size:40px" icon="user" />
      </div>
      <div style="width:100%; text-align:center">
        <h1>{{name}}</h1>
        <h2>{{gender}}</h2>
      </div>

      <div class="taxzi-normal-button">Change Profile Picture<fa class="arrow-icon" icon="angle-right"/></div>
      <div class="taxzi-normal-button">Joining History<fa class="arrow-icon" icon="angle-right"/></div>
      <div @click="tapLogout" class="taxzi-normal-button" style="color:red">Logout<fa class="arrow-icon" icon="angle-right"/></div>
    </div>
    <NavBar active="profile" />
  </div>
</template>

<script>
import NavBar from "~/components/NavBar.vue";

export default {
  data() {
    return {
      name: "NAME",
      gender: "GENDER"
    };
  },
  components: {
    NavBar
  },
  mounted() {
    const user = this.$store.state.user
    if(user == null) {
      this.$router.push('/user/login')
    } else {
      this.name = user.name
      this.gender = user.gender
    }
  },
  methods: {
    tapLogout() {
      this.$store.commit('clearuser')
      this.$router.push('/user/login')
    }
  }
};
</script>

<style scoped>
.profile-picture {
  margin: 10px auto 24px;
  padding: 30px 33px;
  width: 100px;
  height: 100px;
  border-radius: 99px;
  background-color: white;
  -webkit-box-shadow: 0px 11px 143px -20px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 0px 11px 143px -20px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 11px 143px -20px rgba(0, 0, 0, 0.8);
}
.taxzi-normal-button {
  margin: 20px 10px;
  border-radius: 18px;
  background-color: white;
  font-weight: 700;
  height: 60px;
  padding: 18px 24px;
  -webkit-box-shadow: 0px 11px 143px -20px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 0px 11px 143px -20px rgba(0, 0, 0, 0.7);
  box-shadow: 0px 11px 143px -20px rgba(0, 0, 0, 0.7);
}
.arrow-icon {
  position:absolute;
  right:60px;
  font-size: 20px;
}
.title {
  font-size: 50px;
  font-weight: 700;
}
h1 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0px;
}
h2 {
  font-size: 16px;
}
</style>