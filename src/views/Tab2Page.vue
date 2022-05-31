<template>
  <base-layout pageTitle="Restaurant">
      <template v-slot:actions-start>
          <ion-fab-button class="button-left">
            <ion-img src="https://hatscripts.github.io/circle-flags/flags/fr.svg"></ion-img>
          </ion-fab-button>
      </template>
      <template v-slot:actions-end>
          <ion-fab-button class="button-right">
            <ion-icon :icon="cartSharp"></ion-icon>
          </ion-fab-button>
      </template>
      <ion-searchbar :placeholder="$t('SEARCH')"></ion-searchbar>
      <GoogleMap
        id="myMap"
        :api-key="apiKey"
        :zoom="15"
        :streetViewControl=false
        :zoomControl=false
        :mapTypeControl=false
        :center="mylocation"
      >
        <Marker :options="{ position: mylocation, icon: image }" />
        <Marker v-for="(location, i) in locations" :options="{ position: location }" :key="i" />
      </GoogleMap>
    
      <ion-list>
        <ion-radio-group>
          <ion-item @click="changeFocus(48.8709, 2.3561)">
            <RestaurantItem :nomRestaurant="'Goodfood Paris'" :adresseRestaurant="'72 Rue du FBG Saint-Martin'" :check="'true'"/>
          </ion-item>
          <ion-item @click="changeFocus(48.4140129, -4.491587)">
            <RestaurantItem :nomRestaurant="'Goodfood Brest'" :adresseRestaurant="'25 Rue Robespierre'" :check="'true'"/>
          </ion-item>
          <ion-item @click="changeFocus(43.2953929, 5.3647161)">
            <RestaurantItem :nomRestaurant="'Goodfood Marseille'" :adresseRestaurant="'3 Quai du Port'" :check="'true'"/>
          </ion-item>
        </ion-radio-group>
    </ion-list>
  </base-layout>
</template>

<script lang="ts">
import '../styles/index.css'
import '../styles/restaurant.css'

import { IonList, IonSearchbar, IonFabButton, IonIcon } from '@ionic/vue';
import { cartSharp } from 'ionicons/icons';
import { GoogleMap, Marker } from 'vue3-google-map';
import RestaurantItem from '@/components/restaurant/RestaurantItem.vue';
import { getCurrentPosition } from '../../utils/restaurant';
import notification, { TypeNotification } from '../../utils/notification';
import { startLoading, stopLoading } from '../../utils/loader';

export default  {
  components: { IonList, IonSearchbar, RestaurantItem, IonFabButton, IonIcon, GoogleMap, Marker },
  
  setup() {
    const locations = [
      { lat: 48.8709, lng: 2.3561 },
      { lat: 48.4140129, lng: -4.491587 },
      { lat: 43.2953929, lng: 5.3647161 },
    ]

    const image = { 
      url: "https://th.bing.com/th/id/R.e92cb7a10c3bf3ae4b5c716e9f2b2263?rik=Z6RNJ6Qze3MqmQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fGoogle-Maps-Location-Mark.png&ehk=jbteLAl%2fOW630%2bURCXPAfXu1Iyz3w3u12duRB5LZXlQ%3d&risl=&pid=ImgRaw&r=0",
      scaledSize: {
        width: 27, 
        height: 40
      }, 
    }
    return {
      cartSharp,
      locations,
      image,
    }
  },

  data() {
    return {
      apiKey: process.env.VUE_APP_MAPS_API_KEY,
      mylocation: { lat: 48.864716, lng: 2.349014 },
    }
  },

  methods: {
    async getCurrentPosition() {
      try {
        await startLoading("Chargement");
        let position = await getCurrentPosition();
        this.mylocation = { lat: position.latitude, lng: position.longitude };
      }
      catch(e: GeolocationPositionError| any) {
        // code 1 is "Permission Denied"
        if(e.code === 1) {
          notification("Activez la géolocalisation", TypeNotification.Danger);
        }
        else {
          notification("Une erreur est survenue", TypeNotification.Danger);
        }
      }
      finally {
        await stopLoading();
      }
    },

    changeFocus(latitude:number, longitude:number)
    {
      const pos = { lat: latitude, lng: longitude }
      this.myMap.center(pos)
    },
  },

  mounted() {
    this.getCurrentPosition();
  }
}
</script>