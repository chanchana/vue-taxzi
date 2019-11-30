<template>
  <div>
    <div class="header"/>
    <div class="header-footer"/>
    <div style="border-radius:70px;margin:-200px auto;z-index:3;height:140px;width:140px;background-color:white;text-align:center;">
      <div>
        <fa style="font-size:50px;margin:40px auto 20px" icon="user"/>
        <div style="font-weight:700; color:gray;">
          Edit
        </div>
      </div>
    </div>
    
    <div class="content">
      <h1>Name</h1>
      <h2>{{name}}</h2>
      <h1>ID</h1>
      <h2>{{id}}</h2>
      <h1>Gender</h1>
      <h2>{{gender}}</h2>
      <button @click="$router.push('/home')" class="taxzi-button">Done</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: '',
      id: '',
      gender: '',
    }
  },
  mounted() {
    const user = this.$store.state.user
    if(!user) {
      this.$router.push('/user/login')
    } else {
      this.name = user.name
      this.id = user.kmutt_id
      this.gender = user.gender
    }
  }
}
</script>

<style scoped>
.header {
  height: 260px;
  background: linear-gradient(137deg, rgba(0,61,255,1) 0%, rgba(255,119,0,1) 100%);
  z-index: 1;
}
.header-footer {
  margin: -20px 0px;
  border-radius: 20px 20px 0px 0px;
  background-color: #F1F1F1;
  height: 20px;
  z-index: 2;
  -webkit-box-shadow: 0px 11px 143px -20px rgba(0,0,0,0.7);
  -moz-box-shadow: 0px 11px 143px -20px rgba(0,0,0,0.7);
  box-shadow: 0px 11px 143px -20px rgba(0,0,0,0.7);
}
.content {
  margin: 260px 0px 0px;
  padding: 40px;
}
h1 {
  color:rgb(255, 107, 48);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0px;
}
h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
}
</style>