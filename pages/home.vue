<template>
  <div>
    <div class="header"/>
    <div class="header-footer"/>
    <div style="margin:-220px 40px;z-index:3;height:180px;max-width:500px;">
      <div style="height:80px;text-align:center;">
        <img src="~/static/TaxziLogo.png" style="height:62px">
      </div>
      <div style="height:80px;margin:20px 0px;">
        <div style="color:white;font-weight:700">Join your friend by</div>
        <div style="margin:5px 0px 0px 0px;display: flex;height:44px;text-align:center;font-weight:700">
          <div style="border-right: 1px solid rgb(235, 235, 235);border-radius:22px 0px 0px 22px;padding:10px 0px;width:50%;background-color:white;">
            <fa icon="qrcode"/>&nbsp;&nbsp;Scan QR
          </div>
          <div style="border-left: 1px solid rgb(235, 235, 235);border-radius:0px 22px 22px 0px;padding:10px 0px;width:50%;background-color:white;">
            <fa icon="sign-in-alt"/>&nbsp;&nbsp;Enter Pin
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <h4><b>My Party</b></h4>
    </div>
    <NavBar active="home"/>
  </div>
</template>

<script>
import NavBar from "~/components/NavBar.vue"

export default {
  components: {
    NavBar,
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
  padding: 20px 40px 120px 40px;
  background-color: #F1F1F1;
  margin: 260px 0px 0px 0px;
}
</style>