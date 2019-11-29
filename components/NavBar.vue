<template>
  <div class="nav-box">
    <b-row style="margin:26px 10px">
      <b-col v-for="data in navDatas" style="padding:0px">
        <nuxt-link :to="data.link">
          <div v-if="data.id == active" class="nav-button-selected">
            <div>
              <fa style="font-size:26px;" :icon="data.icon"/>
            </div>
            <div>
              {{data.name}}
            </div>
          </div>

          <div v-if="data.id != active" class="nav-button">
            <div>
              <fa style="font-size:26px;color:rgb(161, 161, 161);" :icon="data.icon"/>
            </div>
            <div>
              {{data.name}}
            </div>
          </div>
        </nuxt-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    active: String
  },
  data() {
    return {
      navDatas: [
        {
          id: "home",
          name: "Home",
          icon: "home",
          link:'/home',
        },
        {
          id: "search",
          name: "Search",
          icon: "search",
          link:'/search',
        },
        {
          id: "create",
          name: "Create",
          icon: "plus",
          link:'/create',
        },
        {
          id: "profile",
          name: "Profile",
          icon: "user",
          link:'/profile',
        }
      ]
    };
  },
  methods: {
    tapLink(url) {

    }
  }
};
</script>

<style scoped>
.nav-box {
  background-color: white;
  border-radius: 40px 40px 0px 0px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 100px;
  -webkit-box-shadow: 0px 11px 143px -20px rgba(0,0,0,0.4);
  -moz-box-shadow: 0px 11px 143px -20px rgba(0,0,0,0.4);
  box-shadow: 0px 11px 143px -20px rgba(0,0,0,0.4);
}
.nav-button {
  text-align: center;
  color: gray;
}
.nav-button-selected {
  text-align: center;
  color: rgb(12, 45, 248);
  font-weight: 700;
}
</style>