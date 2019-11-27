<template>
  <!-- <b-container>
    <b-row>
      <b-col>
        <div col md="auto" class="mr-auto bubble">{{name}}: {{message}}</div>
      </b-col>
    </b-row>
  </b-container> -->
    <div class="box">
      <span class="bubble">
        {{name}}: {{message}}
      </span>
    </div>
</template>

<script>
export default {
  props: {
    name: String,
    message: String,
  },
}
</script>

<style scoped>
  .box {
    /* background-color:cornflowerblue; */
    margin: 30px 10px;
    min-width: 80%;
  }

  .bubble {
    color: white;
    /* position: relative; */
    background-color:cornflowerblue;
    border-radius: 10px;
    padding: 8px;
    width: unset;
    min-width: unset;
  }
</style>