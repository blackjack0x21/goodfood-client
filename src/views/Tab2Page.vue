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
      api-key="AIzaSyDXApi9VzFbHBnvrwxliROLsfqcjkThuuY"
      :zoom="15"
      :streetViewControl=false
      :zoomControl=false
      :mapTypeControl=false
      :center="mylocation"
      >
        <Marker :options="{ position: mylocation }" />
      </GoogleMap>
    
      <ion-list>
        <ion-item>
                <RestaurantItem :nomRestaurant="'Goodfood Paris'" :adresseRestaurant="'2 All. Adrienne Lecouvreur'" :check="'true'"/>
        </ion-item>
        <ion-item>
                <RestaurantItem :nomRestaurant="'Goodfood Brest'" :adresseRestaurant="'3 Allee. Gerome Bataille'" :check="'true'"/>
        </ion-item>
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

export default  {
  components: { IonList, IonSearchbar, RestaurantItem, IonFabButton, IonIcon, GoogleMap, Marker },
  
  setup() {

    getCurrentPosition().then(function(position:any) {
      let latitude = position.latitude
      let longitude = position.longitude
      let mylocation = { lat: latitude, lng: longitude }
    });

    return {
      cartSharp
    }
  },
}
</script>