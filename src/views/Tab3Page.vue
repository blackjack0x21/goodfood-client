<template>
  <base-layout pageTitle="Profil">
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
  </base-layout>
</template>

<script lang="ts">
import { IonToolbar, IonSearchbar, IonIcon, IonImg } from '@ionic/vue';
import { cartSharp } from 'ionicons/icons';
import '../styles/index.css'

export default  {
  components: { IonIcon, IonImg },
  setup() {
    return {
      cartSharp,
    }
  }
}
</script>