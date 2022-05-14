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
      <ion-img src="https://www.journaldugeek.com/content/uploads/2017/02/google-maps.jpg"></ion-img>
      
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
import { IonList, IonSearchbar, IonFabButton, IonIcon } from '@ionic/vue';
import { cartSharp } from 'ionicons/icons';
import RestaurantItem from '@/components/restaurant/RestaurantItem.vue';
import '../styles/index.css'

export default  {
  components: { IonList, IonSearchbar, RestaurantItem, IonFabButton, IonIcon },

  setup() {
    return {
      cartSharp,
    }
  },
}
</script>