<template>
  <div class="box">
    <b-row>
      <b-col cols="2" @click="$router.push('/home')" style="padding:20px 20px 20px 20px;font-size:20px;"><fa icon="chevron-left"/></b-col>
      <b-col cols="8">
        <b-row class="text-center">
          <b-col><div class="title"><b class="taxzi-text-gradient">Chat</b></div></b-col>
        </b-row>
        <b-row class="text-center">
          <b-col><div class="sub-title">{{from}} <fa icon="arrow-right" style="font-size:12px;margin:0px 5px 1px 5px"/> {{to}}</div></b-col>
        </b-row>
      </b-col>
      <b-col cols="2" style="padding:20px 20px 20px 20px;font-size:20px;"><fa icon="ellipsis-h"/></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    from: String,
    to: String,
  }
}
</script>

<style scoped>
  .box {
    overflow: hidden;
    background-color: white;
    padding: 20px 0px;
    -webkit-box-shadow: 0px 11px 143px -53px rgba(0,0,0,0.7);
    -moz-box-shadow: 0px 11px 143px -53px rgba(0,0,0,0.7);
    box-shadow: 0px 11px 143px -53px rgba(0,0,0,0.7);
    height: 110px;
    padding: 20px 40px 0px 40px;
    z-index: 3;
  }
  .title {
    font-size: 32px;
  }
  .sub-title {
    font-size: 14px;
    color:gray;
  }
</style>