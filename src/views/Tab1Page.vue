<template>
  <base-layout pageTitle="Accueil">
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
          <a class="pizza-items" href="/pizzadetail/">
            <PizzaItem :pizzaImage="'https://laroma-pizza.fr/wp-content/uploads/2021/06/pizza-homepage.png'" :name="'Bacon'" :price="'12€'"/>
          </a>
        </swiper-slide>
        <swiper-slide>
          <PizzaItem :pizzaImage="'https://www.pngplay.com/wp-content/uploads/2/Top-View-Pizza-Transparent-Images.png'" :name="'Poivron'" :price="'14€'"/>
        </swiper-slide>
        <swiper-slide>
          <PizzaItem :pizzaImage="'assets/images/Real-Dominos-Pizza-Transparent-PNG.png'" :name="'Chorizo'" :price="'10€'"/>
        </swiper-slide>
        <swiper-slide>
          <PizzaItem :pizzaImage="'https://www.pngplay.com/wp-content/uploads/2/Cheese-Pizza-Transparent-Background.png'" :name="'4 fromages'" :price="'12€'"/>
        </swiper-slide>
      </swiper>
      <ion-button shape="round" expand="block">{{ $t('SEARCH') }}</ion-button>
  </base-layout>
    <!-- <ion-header>
      <ion-toolbar>
          <ion-fab-button class="button-left">
            <ion-img src="https://hatscripts.github.io/circle-flags/flags/fr.svg"></ion-img>
          </ion-fab-button>
          <ion-fab-button class="button-right">
            <ion-icon :icon="cartSharp"></ion-icon>
          </ion-fab-button>
      </ion-toolbar>
    </ion-header> -->
</template>

<script lang="ts">
import { IonToolbar, IonSearchbar, IonIcon, IonImg } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { cartSharp } from 'ionicons/icons';
import PizzaItem from '@/components/PizzaItem.vue';
import '../styles/index.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default  {
  components: { IonToolbar, IonSearchbar, PizzaItem, IonIcon, Swiper, SwiperSlide, IonImg },
  setup() {
    return {
      cartSharp,
    }
  }
}
</script>