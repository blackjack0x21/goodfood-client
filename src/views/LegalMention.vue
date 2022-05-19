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
  </base-layout>
</template>

<script>

    import '../styles/index.css'
    import { IonIcon, IonImg } from '@ionic/vue';
   
    export default { IonIcon, IonImg }
    
    

</script>
