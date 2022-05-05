<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{nomRestaurant}}</ion-card-title>
         </ion-card-header> 
         <ion-card-content>{{adresseRestaurant}}</ion-card-content> 
    </ion-card>
</template>

<script lang="ts">
    import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg } from '@ionic/vue';
    import '../../styles/restaurantitem.css';
    export default {
        props: {
            nomRestaurant: String,
            adresseRestaurant: String,
            check: Boolean
        },
        components: { IonCard, IonCardHeader, IonCardTitle, IonCardContent }
}
</script>