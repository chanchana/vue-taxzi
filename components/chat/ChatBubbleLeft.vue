<template>
  <div class="box">
    <div class="name">{{name}}</div>
    <div>
      <span class="bubble">{{message}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    message: String
  }
};
</script>

<style scoped>
.box {
  margin: 10px 10px;
  min-width: 80%;
}
.name {
  font-size: 12px;
  margin: 5px;
  color:gray;
}
.bubble {
  color: white;
  background-color: cornflowerblue;
  border-radius: 10px;
  padding: 8px;
  width: unset;
  min-width: unset;
}
</style>