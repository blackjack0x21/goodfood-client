<template>
    <ion-card>
    <ion-card-header>
        <ion-img src="https://laroma-pizza.fr/wp-content/uploads/2021/06/pizza-homepage.png"></ion-img>
        <ion-card-title>Reine</ion-card-title>
    </ion-card-header>

    <ion-card-content>12€</ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg } from '@ionic/vue';
import '../styles/pizzaitem.css';

export default {
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg }
}
</script>