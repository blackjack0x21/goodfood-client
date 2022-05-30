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
import notification, { TypeNotification } from '../../utils/notification';
import { startLoading, stopLoading } from '../../utils/loader';

export default  {
  components: { IonList, IonSearchbar, RestaurantItem, IonFabButton, IonIcon, GoogleMap, Marker },
  
  setup() {
    return {
      cartSharp,
    }
  },

  data() {
    return {
      mylocation: { lat: 48.864716, lng: 2.349014 },
      apiKey: process.env.VUE_APP_MAPS_API_KEY,
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

    }
  },

  mounted() {
    this.getCurrentPosition();
  }
}
</script>