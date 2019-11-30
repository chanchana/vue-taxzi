<template>
  <div fluid class="type-bar">
    <b-row class="text-center">
      <b-col cols="1">+</b-col>
      <b-col cols="11">
        <b-input-group>
          <b-form-input></b-form-input>

          <b-input-group-append>
            <b-button>Send</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.type-bar {
  position: absolute;
  padding: 20px;
  bottom: 0px;
  height: 80px;
}
</style>