<template>
  <div class="box">
    <!-- <div class="name">{{name}}</div> -->
    <div>
      <span class="bubble">{{message}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  }
};
</script>

<style scoped>
.box {
  margin: 10px 10px;
  min-width: 80%;
  text-align: center;
}
.name {
  font-size: 12px;
  margin: 5px;
  text-align: center;
}
.bubble {
  color: gray;
  
  background-color: none;
  border-radius: 10px;
  padding: 8px;
  width: unset;
  min-width: unset;
}
</style>