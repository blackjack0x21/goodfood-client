<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
          <ion-fab-button class="button-left">
            <ion-img src="https://hatscripts.github.io/circle-flags/flags/fr.svg"></ion-img>
          </ion-fab-button>
          <ion-fab-button class="button-right">
            <ion-icon :icon="cartSharp"></ion-icon>
          </ion-fab-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-searchbar></ion-searchbar>
        <ion-toolbar>
          <ion-segment>
            <ion-segment-button>
              Base tomate
            </ion-segment-button>
            <ion-segment-button>
              Base crème
            </ion-segment-button>
            <ion-segment-button>
              Boissons
            </ion-segment-button>
          </ion-segment>
        </ion-toolbar>

        <ion-slides :options="slideOpts">
          <ion-slide>
            <PizzaItem/>
          </ion-slide>
          <ion-slide>
            <PizzaItem/>
          </ion-slide>
          <ion-slide>
            <PizzaItem/>
          </ion-slide>
        </ion-slides>
        <ion-button shape="round" expand="block">Voir plus</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonContent, IonSearchbar, IonFabButton, IonIcon, IonSlide, IonSlides } from '@ionic/vue';
import { cartSharp } from 'ionicons/icons';
import PizzaItem from '@/components/PizzaItem.vue';
import '../styles/index.css'

export default  {
  components: { IonHeader, IonToolbar, IonContent, IonPage, IonSearchbar, PizzaItem, IonFabButton, IonIcon, IonSlide, IonSlides },
  setup() {
    const slideOpts = {
      slidesPerView: 1.5,
      speed: 400,
      centeredSlides: true,
    };

    return {
      cartSharp,
      slideOpts
    }
  }
}
</script>