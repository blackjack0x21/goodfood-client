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

        <swiper
          :slides-per-view="1.5"
          :centered-slides=true
          :modules="modules"
          :direction="horizontal"
          :loop="true"
        >
          <swiper-slide>
            <PizzaItem :pizzaImage="'https://laroma-pizza.fr/wp-content/uploads/2021/06/pizza-homepage.png'" :name="'Bacon'" :price="'12€'"/>
          </swiper-slide>
          <swiper-slide>
            <PizzaItem :pizzaImage="'https://www.pngplay.com/wp-content/uploads/2/Top-View-Pizza-Transparent-Images.png'" :name="'Poivron'" :price="'14€'"/>
          </swiper-slide>
          <swiper-slide>
            <PizzaItem :pizzaImage="'https://www.pngplay.com/wp-content/uploads/6/Real-Dominos-Pizza-Transparent-PNG.png'" :name="'Chorizo'" :price="'10€'"/>
          </swiper-slide>
          <swiper-slide>
            <PizzaItem :pizzaImage="'https://www.pngplay.com/wp-content/uploads/2/Cheese-Pizza-Transparent-Background.png'" :name="'4 fromages'" :price="'12€'"/>
          </swiper-slide>
        </swiper>
        <ion-button shape="round" expand="block">Voir plus</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonContent, IonSearchbar, IonFabButton, IonIcon } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { cartSharp } from 'ionicons/icons';
import PizzaItem from '@/components/PizzaItem.vue';
import '../styles/index.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default  {
  components: { IonHeader, IonToolbar, IonContent, IonPage, IonSearchbar, PizzaItem, IonFabButton, IonIcon, Swiper, SwiperSlide },
  setup() {
    return {
      cartSharp,
    }
  }
}
</script>