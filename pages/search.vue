
<template>

  <div style="background-color:#F1F1F1;text-align:center;">
    <!-- <b><h1><p class="taxzi-text-gradient" style="font-weight:700;width:none;min-width:none;"> Search</p></h1></b> -->
    <div style="margin:0px 40px 20px 40px;padding:30px 0px 0px;text-align:left;">
      <span class="taxzi-text-gradient" style="font-size:48px;font-weight:700;width:none;min-width:none;">Search</span>
    </div>
        <!-- {{user}} -->
    <form>
        <input id="rcorners1" type="text" v-model="search" placeholder="Destination,Time,..."/>
        <fa class="iconsearch" icon="search" />
        <fa class="iconfilter" icon="filter"/>
    </form>
    <b-modal ref="my-modal-filter" size="sm" centered hide-footer hide-header header-close>
      <h2 class = "custom-font" style="margin-top:10px; margin-left:20px; font-size:24px;"><b>Filter By</b></h2>
      <button class="rectangle-filter custom-font">
        <b style="float:left; font-size:16px;">Destination Name</b>
        <fa style="width: 20px; height: 20px; color:rgba(255, 107, 48, 1.0); float:right; display:inline;" icon="angle-right"/>
      </button>
      <button  class="rectangle-filter custom-font">
        <b style="float:left; font-size:16px;">Date and Time</b>
        <fa style="width: 20px; height: 20px; color:rgba(255, 107, 48, 1.0); float:right; display:inline;" icon="angle-right"/>
      </button>
      <div class="rectangle-filter custom-font">
        <b-form-checkbox
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
          value="accepted"
          unchecked-value="not_accepted"
        >
        <b style="font-size:16px;">Lady Party</b>
        </b-form-checkbox>
      </div>
      <br>
      <b-button class="rectangle-done custom-font" block @click="hideModal"><b style="font-size:24px; color:white;">Done</b></b-button>
    </b-modal>
    <b><button @click="showModal" style= "top: 150px; font-weight:600; color:rgba(255, 107, 48, 1.0); background: #F1F1F1; border:0; position: absolute; margin: 53px; left: 240px; font-size:14px; cursor: pointer;">
    Filter
    </button></b>
    <br><br>

    <div v-for="info in filtered" v-bind:key="info.id">
      <PartyCard :infoData="info" :userid="user._id"/>
    </div>

    <div style="height:130px"/>

    <NavBar active="search"/>

  </div>
</template>

<script>

import PartyCard from "~/components/PartyCard.vue"
import NavBar from "~/components/NavBar.vue"

export default {
  components: {
    PartyCard,
    NavBar,
  },
  data(){
    return {
      user: '',
      infos: [],
      search:'',
      status: 'not_accepted',
    }
  },
  mounted() {
    const user = this.$store.state.user
    if(!user) {
      this.$router.push('/user/login')
    } else {
      this.user = user
    }

    this.$axios.$get('http://taxzi.herokuapp.com/parties').then((res) => {
      if (!res.status) {
        alert(res.error)
      } else {
        this.infos = res.data
      }
    })
  },
  methods: {
    showModal() {
      this.$refs["my-modal-filter"].show();
    },
    hideModal() {
      this.$refs["my-modal-filter"].hide();
    }
  },
  computed:{
    filtered(){
      return this.infos.filter((info) => {
        return info.to.toLowerCase().match(this.search.toLowerCase())|| info.from.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }

}
</script>

<style>
  body{
    /* background-color  : #F1F1F1; */
    /* font-family       : "Nunito", Helvetica, Arial, serif; */
  }


  #rcorners1 {
    font-color        : rgba(129, 129, 129, 1.0);
    font-size         : 14px;
    margin-top        : 0px;
    margin-right      : 40px;
    margin-left       : 40px;
    border-radius     : 70px;
    border            : 0px;
    background        : rgba(228, 228, 228, 1.0);
    padding           : 25px; 
    width             : 285px;
    height            : 10px;    
  }

  .iconfilter {
  background-color    : rgba(255,255,255,0.0);
  color               : rgba(255, 107, 48, 1.0);
  top                 : 156px;
  height              : 20px;
  width               : 20px;
  position            : absolute;
  margin              : 50px;
  left                : 225px;
  -ms-transform       : rotate(0deg); /* IE 9 */
  -webkit-transform   : rotate(0deg); /* Chrome, Safari, Opera */
  transform           : rotate(0deg);
  }
.iconsearch{
  background-color    : rgba(255,255,255,0.0);
  top                 : 135px;
  height              : 23px;
  width               : 23px;
  position            : absolute;
  margin              : 0;
  left                : 288px;
  -ms-transform       : rotate(0deg); /* IE 9 */
  -webkit-transform   : rotate(0deg); /* Chrome, Safari, Opera */
  transform           : rotate(0deg);
  }
.rectangle{
  width               : 300px;
  padding             : 13px;
  background          : #FAFAFA;
  border-radius       : 20px;
  border              : 10px;
  margin-top          : 15px;
  margin-right        : 30px;
  margin-left         : 30px;
  box-shadow: 5px 5px 15px 5px rgba(228, 228, 228, 1.0);
  transition-duration: 0.4s;
  cursor: pointer;
}
.rectangle:hover {background-color: #e7e7e7;}

.rectangle-member{
  width               : 215px;
  padding             : 13px;
  background          : #FAFAFA;
  border-radius       : 20px;
  border              : 10px;
  margin-top          : 0px;
  margin-right        : 30px;
  margin-left         : 30px;
  transition-duration: 0.4s;
  cursor: pointer;
}
.rectangle-member:hover {background-color: #e7e7e7;}

.rectangle-join{
  width               : 140px;
  padding             : 5px;
  background          : rgba(255, 107, 48, 0.9);
  border-radius       : 60px;
  border              : 10px;
  float               : left;    
  margin-top          : 0px;
  margin-bottom       : 10px;
  margin-right        : 10px;
  margin-left         : 10px;
  box-shadow: 5px 5px 30px 1px rgba(255, 107, 48, 0.7);
  transition-duration: 0.4s;
  cursor: pointer;
}
.rectangle-join:hover {background-color: rgba(255, 107, 48, 1.0);}

.rectangle-each-member{
  width               : 310px;
  padding             : 13px;
  background          : #FAFAFA;
  border-radius       : 20px;
  border              : 10px;
  margin-top          : 15px;
  margin-right        : 30px;
  margin-left         : 33px;
  box-shadow: 5px 5px 30px 1px rgb(0, 0, 0,0.1);
  transition-duration: 0.4s;
  cursor: pointer;
}

.rectangle-each-member:hover {background-color: rgba(255, 107, 48, 0.9);}

.rectangle-filter{
  width               : 250px;
  padding             : 13px;
  background          : #FAFAFA;
  border-radius       : 20px;
  border              : 10px;
  margin-top          : 15px;
  margin-right        : 20px;
  margin-left         : 14px;
  box-shadow: 5px 5px 30px 1px rgb(0, 0, 0,0.1);
  transition-duration: 0.4s;
  cursor: pointer;
}

.rectangle-filter:hover {background-color: rgba(255, 107, 48, 0.9);}

.rectangle-done{
  width               : 130px;
  padding             : 5px;
  background          : rgba(255, 107, 48, 0.9);
  border-radius       : 60px;
  border              : 10px;
  float               : left;    
  margin-top          : 0px;
  margin-bottom       : 10px;
  margin-right        : 50px;
  margin-left         : 75px;
  box-shadow: 5px 5px 30px 1px rgba(255, 107, 48, 0.7);
  transition-duration: 0.4s;
  cursor: pointer;
}
.rectangle-done:hover {background-color: rgba(255, 107, 48, 1.0);}

</style>