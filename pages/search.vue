
<template>

  <div>
    <b><h1>Search</h1></b>
 
    <form>
        <input id="rcorners1" type="text" v-model="search" placeholder="Destination,Time,..."/>
        <img class="iconsearch" src="~/assets/filter-lady-icons8-search-90@2x.png"/>
        <img class="iconfilter" src="~/assets/search-icons8-slider-90@2x.png"/>
    </form>
    <b><button type="button" style= "top: 153px; color:rgba(255, 107, 48, 1.0); background: #F1F1F1; border:0; position: absolute; margin: 53px; left: 240px; font-size:15px; cursor: pointer;">
    Filter
    </button></b>
    <br><br>
    <div v-for="info in filtered" v-bind:key="info.id">
        
    </div>
    <div v-for="info in filtered" v-bind:key="info.id">
      <PartyCard :infoData="info"/>
    </div>

  </div>
</template>

<script>

import PartyCard from "~/components/PartyCard.vue"

export default {
  components: {
    PartyCard,
  },
  data(){
    return {
      infos: [
        {
          start       : 'KMUTT',
          destination : 'Central World',
          members     :"3/4",
          date        :'Today',
          time        :'18:00',
          id          :'sample-info'
        },
        {
          start       : 'KMUTT',
          destination : 'Central Rama II',
          members     :"3/4",
          date        :'Today',
          time        :'19:00',
          id          :'sample-info-2'
        },
        {
          start       : 'KMUTt',
          destination : 'Siam Paragon',
          members     :"2/4",
          date        :'Today',
          time        :'20:00',
          id          :'sample-info-3'
        },
        {
          start       : 'KMUTT',
          destination : 'ไปบ้านมึงอะ',
          members     :"1/4",
          date        :'Today',
          time        :'00:00',
          id          :'sample-info-4'
        }
      ],
      search:''
    }
  },
  methods: {

  },
  computed:{
    filtered:function(){
      return this.infos.filter((info) => {
        return info.destination.toLowerCase().match(this.search.toLowerCase());
      });
    }
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito:800,400,700,900');
  body{
    background-color  : #F1F1F1;
    font-family       : "Nunito", Helvetica, Arial, serif;
  }
  h1{
    font-size         : 48px;
    margin-top        : 40px;
    margin-right      : 40px;
    margin-left       : 40px;
    margin-bottom     : 25px;
    color             : rgba(255, 107, 48, 1.0);
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
  top                 : 160px;
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
  top                 : 143px;
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
  width               : 320px;
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

</style>