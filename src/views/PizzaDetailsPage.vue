<template>
  <base-layout pageTitle="Détails pizza" page-default-back-link="/tabs/tab1">
    <ion-img src='https://www.pngplay.com/wp-content/uploads/6/Real-Dominos-Pizza-Transparent-PNG.png'></ion-img>
      <h1 text-align="center" id="text-pizza"><strong> Bacon </strong></h1>
      <h2 text-align="center" id="desc-pizza">La pizza est une recette traditionnelle issue de la cuisine italienne. Trouvant son origine à Naples, 
          elle est préparée à base d’une galette de pâte à pain remplie de divers mélanges d’ingrédients avant d’être cuite au four.</h2>
    <ion-button shape="round" expand="block" @click="addToBasketHandler"> {{ $t('Ajouter au panier') }} </ion-button> 
  </base-layout>
</template>

<script lang="ts">
import { IonButton, IonImg} from '@ionic/vue';
import '../styles/pizzadetailspage.css';
import notification, { TypeNotification } from '../../utils/notification';
import { startLoading, stopLoading } from '../../utils/loader';
export default {
    components: {
        IonImg,
        IonButton,
    },
    
    methods: {
      async addToBasketHandler() {
        try {
          await startLoading("Ajout au panier en cours");
          sessionStorage.setItem('clé', 'numéro');
          notification("Pizza ajoutée au panier", TypeNotification.Success);
        }
        catch(error) {
          notification("Échec de l'ajout au panier", TypeNotification.Danger);
        }
        finally {
          stopLoading();
        }
      }
    }
}
</script>