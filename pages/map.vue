<template>
  <div>
    <div class="content">
        <b-row>
          <b-col cols="2">
            <fa @click="$router.push('/home')" style="margin:14px 0px 0px;color:blue;font-size:20px" icon="chevron-left" />
          </b-col>
          <b-col cols="8" style="text-align:center;">
            <span class="taxzi-text-gradient title">Create</span>
          </b-col>
          <b-col cols="2"></b-col>
        </b-row>
    </div>
    <!-- <div class="flex">
      <button @click="returnToCenter()" class="button">Return to center</button>
      <p class="visibleCities">
        Visible cities: {{ locations }}
        <span
          v-text="locationsVisibleOnMap"
        />
      </p>
      <button type="button" v-on:click="route()">Route</button>
    </div> -->
    <GMap
      ref="gMap"
      :cluster="{options: {styles: clusterStyle}}"
      :center="{lat: locations[0].lat, lng: locations[0].lng}"
      :options="{fullscreenControl: false, streetViewControl: false, mapTypeControl: false, zoomControl: true, gestureHandling: 'cooperative', styles: mapStyle}"
      :zoom="10"
      
      @bounds_changed="checkForMarkers"
    >
      <GMapMarker
        v-for="location in locations"
        :key="location.id"
        :position="{lat: location.lat, lng: location.lng}"
        :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
        :zoom="11"
        @click="currentLocation = location"
        style="color:red;"
      >
        <GMapInfoWindow>
          <b>{{ location.name }}</b>
          <br>
          <br>
          <code>
            Lat: {{ location.lat }},
            Lng: {{ location.lng }}
          </code>
        </GMapInfoWindow>
      </GMapMarker>
      
      <div class="member-dialog">
        <br>
        <input type="text" v-model="form.from" id="from" name="from" placeholder="From"  class="rectangle-map">
        <input type="text" v-model="form.to" id="to" name="to" placeholder="To" class="rectangle-map">
        <br><br>
        <b-button @click="tapNext" class="rectangle-done custom-font" block ><b style="font-size:24px; color:white;">Next</b></b-button>
      </div>
    </GMap>
    
  </div>
</template>

<script>

export default {
  name: 'google-map',
  data() {
    return {
      form: {
        from: '',
        to: '',
      },
      currentLocation: {},
      locationsVisibleOnMap: "",
      start: "",
      finish: "",
      locations: [
        {
          lat: 13.6510,
          lng: 100.4954,
          name: "KMUTT"
        },
        {
          lat: 13.7466304,
          lng: 100.53933510000002,
          name: "Central World"
        }
      ],
      pins: {
        selected:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB5VU7SwNBEJ7LmZBgMC+UdKKx0MZCG2srwcbCB2glpFDQ3to/IegvSAIWPrBJIySlipUKKqYLaHJ3iWIelzu/DTk8j71H7MQPltmZnflmZ3b3juivQ3BzCIfDI4FAYBvTRV3XR7tBglCCOIP9oFwuv/46QSwWWwfZIaaDNi7vGOlqtZqhfhPE4/EViAy5V6ljE8uVSuXYc4JkMjncarUeMR0ib5Db7fZEvV6vWBd8PG+Q73LIFYyj3lAsa1G/37/D4+JWgPbcQkybd9jpdGYVRXlmSiQSSYmieMWmhgMuwI0kSTPkpQJgzKJnDfJuKYryBJH7sVNBSPGI7BKoFl3n+GguMY4JHiz6GtoybiisRczmEtPFAM+Ifl6i5DmTKYqeX+Nssj19lUz9N2J4XNxDTiQSkwi4oz6ADU3hLdxb7dwW9RyL5B0FHrltAgZUsEce4eRrmwB3ugCRJ3fk4VvsOwEDHtcWxKeDy4emaWmHdRKdFpvNphQKhdhFmOet42D3sftTJw7X/wHgw/U8h1ywkJ/gYJeI/wi/g8kdmqqqG5Alk62Er+emG7nXBFSr1aroNSNknwOVzZnNS6xIHtFoNF6CweAbpheyLOfo3+ALfrSuzJ1F8EsAAAAASUVORK5CYII=",
        notSelected:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB5VU7SwNBEJ7LmZBgMC+UdKKx0MZCG2srwcbCB2glpFDQ3to/IegvSAIWPrBJIySlipUKKqYLaHJ3iWIelzu/DTk8j71H7MQPltmZnflmZ3b3juivQ3BzCIfDI4FAYBvTRV3XR7tBglCCOIP9oFwuv/46QSwWWwfZIaaDNi7vGOlqtZqhfhPE4/EViAy5V6ljE8uVSuXYc4JkMjncarUeMR0ib5Db7fZEvV6vWBd8PG+Q73LIFYyj3lAsa1G/37/D4+JWgPbcQkybd9jpdGYVRXlmSiQSSYmieMWmhgMuwI0kSTPkpQJgzKJnDfJuKYryBJH7sVNBSPGI7BKoFl3n+GguMY4JHiz6GtoybiisRczmEtPFAM+Ifl6i5DmTKYqeX+Nssj19lUz9N2J4XNxDTiQSkwi4oz6ADU3hLdxb7dwW9RyL5B0FHrltAgZUsEce4eRrmwB3ugCRJ3fk4VvsOwEDHtcWxKeDy4emaWmHdRKdFpvNphQKhdhFmOet42D3sftTJw7X/wHgw/U8h1ywkJ/gYJeI/wi/g8kdmqqqG5Alk62Er+emG7nXBFSr1aroNSNknwOVzZnNS6xIHtFoNF6CweAbpheyLOfo3+ALfrSuzJ1F8EsAAAAASUVORK5CYII="
      },
      clusterStyle: [
        {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          width: 56,
          height: 56,
          textColor: "#fff"
        }
      ],
      mapStyle: [
      ]
    };
  },

  methods: {
    returnToCenter() {
      this.$refs.gMap.map.setCenter(this.locations[0]);
    },

    checkForMarkers() {
      this.locations.forEach((location, i) => {
        location.visible = this.$refs.gMap.map
          .getBounds()
          .contains(this.$refs.gMap.markers[i].getPosition());
      });

      this.locationsVisibleOnMap = this.locations
        .filter(l => l.visible)
        .map(l => l.name)
        .join(", ");
    },
    route() {
      this.$refs.gMap.map.route(this.location[0], this.location[1]);
    },
    tapNext() {
      this.$store.commit('setplace', this.form)
      this.$router.push('/create')
    }
  }
};
</script>

// <style lang="scss">
// * {
//   font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
// }

// h1 {
//   color: #206569;
//   margin-bottom: 5px;
//   & + p {
//     margin-top: 0;
//     font-size: 16px;
//     a {
//       color: #206569;
//     }
//   }
// }

// span,
// p,
// a {
//   color: #206569;
//   font-size: 16px;
// }

// .visibleCities {
//   position: absolute;
//   span {
//     font-weight: bold;
//   }
// }

// .flex {
//   position: relative;
//   padding-bottom: 50px;
// }

// .GMap,
// p {
//   margin-top: 30px;
// }

// .GMap__Wrapper {
//   width: 100%;
//   height: 400px;
// }

// .button {
//   background-color: #206569;
//   color: #fff;
//   outline: 0;
//   border: 0;
//   padding: 10px 20px;
//   font-size: 14px;
//   cursor: pointer;
//   transition: background-color 200ms;
//   backface-visibility: hidden;
//   &:hover {
//     background-color: #12957b;
//   }
// }
/* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
  #map{
    height: 100%;
  }
      /* Optional: Makes the sample page fill the window. */
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .content {
  padding: 20px 20px 20px 20px;
  }
  .title {
  font-size: 30px;
  font-weight: 700;
  }
  .member-dialog {
      position: fixed;
      height: 275px;
      bottom: 0px;
      left: 0px;
      width: 100%;
      background : white;
      z-index: 10;
      border-radius: 40px 40px 0px 0px;
    }
  .google-map {
    width: 100%; 
    height: 100%;
    position: absolute; 
    left:0; 
    top:0;
  }
  .rectangle-map{
  width               : 300px;
  padding             : 15px;
  background          : #FAFAFA;
  border-radius       : 20px;
  border              : 10px;
  margin-top          : 15px;
  margin-right        : 30px;
  margin-left         : 35px;
  box-shadow: 5px 5px 30px 1px rgb(0, 0, 0,0.1);
  transition-duration: 0.4s;
  cursor: pointer;
}

.rectangle-done{
  width               :300px;
  padding             : 10px;
  background          : rgba(255, 107, 48, 0.9);
  border-radius       : 60px;
  border              : 10px;
  float               : left;    
  margin-top          : 0px;
  margin-bottom       : 10px;
  margin-right        : 50px;
  margin-left         : 35px;
  box-shadow: 5px 5px 30px 1px rgba(255, 107, 48, 0.7);
  transition-duration: 0.4s;
  cursor: pointer;
}
.rectangle-done:hover {background-color: rgba(255, 107, 48, 1.0);}
</style>
