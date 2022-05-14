<template>
  <ion-nav-link
    router-link="/pizzadetails/"
  >
    <ion-card>
      <ion-card-header>
          <ion-img :src="pizzaImage"></ion-img>
          <ion-card-title>{{name}}</ion-card-title>
      </ion-card-header>
      <ion-card-content>{{price}}</ion-card-content>
    </ion-card>
  </ion-nav-link>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg, IonNavLink } from '@ionic/vue';
import '../styles/pizzaitem.css';

export default {
    props: {
      pizzaId: String,
      pizzaImage: String,
      name: String,
      price: String  
    },
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonNavLink }
}
</script>