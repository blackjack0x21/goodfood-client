<template>
    <ion-card>
    <ion-card-header>
        <!-- <ion-img src="https://laroma-pizza.fr/wp-content/uploads/2021/06/pizza-homepage.png"></ion-img> -->
        <ion-img :src="pizzaImage"></ion-img>
        <ion-card-title>{{name}}</ion-card-title>
    </ion-card-header>

    <ion-card-content>{{price}}</ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg } from '@ionic/vue';
import '../styles/pizzaitem.css';

export default {
    props: {
      pizzaImage: String,
      name: String,
      price: String  
    },
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg }
}
</script>