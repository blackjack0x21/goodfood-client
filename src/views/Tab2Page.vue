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
        <Marker v-for="(location, i) in locations" :options="{ position: location }" :key="i" />
      </GoogleMap>
    
      <ion-list>
        <ion-radio-group>
          <ion-item>
            <RestaurantItem :nomRestaurant="'Goodfood Paris'" :adresseRestaurant="'2 All. Adrienne Lecouvreur'" :check="'true'"/>
          </ion-item>
          <ion-item>
            <RestaurantItem :nomRestaurant="'Goodfood Brest'" :adresseRestaurant="'3 Allee. Gerome Bataille'" :check="'true'"/>
          </ion-item>
          <ion-item>
            <RestaurantItem :nomRestaurant="'Goodfood Lyon'" :adresseRestaurant="'5 Allee. Betrand Renard'" :check="'true'"/>
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
      { lat: -31.56391, lng: 147.154312 },
      { lat: -33.718234, lng: 150.363181 },
      { lat: -33.727111, lng: 150.371124 },
      { lat: -33.848588, lng: 151.209834 },
      { lat: -33.851702, lng: 151.216968 },
      { lat: -34.671264, lng: 150.863657 },
      { lat: -35.304724, lng: 148.662905 },
      { lat: -36.817685, lng: 175.699196 },
      { lat: -36.828611, lng: 175.790222 },
      { lat: -37.75, lng: 145.116667 },
      { lat: -37.759859, lng: 145.128708 },
      { lat: -37.765015, lng: 145.133858 },
      { lat: -37.770104, lng: 145.143299 },
      { lat: -37.7737, lng: 145.145187 },
      { lat: -37.774785, lng: 145.137978 },
      { lat: -37.819616, lng: 144.968119 },
      { lat: -38.330766, lng: 144.695692 },
      { lat: -39.927193, lng: 175.053218 },
      { lat: -41.330162, lng: 174.865694 },
      { lat: -42.734358, lng: 147.439506 },
      { lat: -42.734358, lng: 147.501315 },
      { lat: -42.735258, lng: 147.438 },
      { lat: -43.999792, lng: 170.463352 },
    ]

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