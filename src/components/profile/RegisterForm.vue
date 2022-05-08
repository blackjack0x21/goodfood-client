<template>
    <form class="ion-padding" @submit.prevent="registerHandler">
        <ion-list>
            <ion-item>
                <ion-label position="floating">Prenom</ion-label>
                <ion-input type="text" required  v-model="firstName"/>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Nom</ion-label>
                <ion-input type="text" required  v-model="lastName"/>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input required type="email" v-model="email"/>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Mot de passe</ion-label>
                <ion-input type="password" required v-model="password"/>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Confirmation mot de passe</ion-label>
                <ion-input type="password" required v-model="passwordConfimation"/>
            </ion-item>
        </ion-list>            
        <ion-label v-if="errorMessage != ''" position="floating" style="color:#C20000">{{errorMessage}}</ion-label>
        <ion-button v-if="!chargement" shape="round" type="submit" expand="block">S'inscrire</ion-button>
    </form>
    <div class="ion-text-center">
        <ion-nav-link router-link="/login/">Connexion</ion-nav-link>
    </div>
</template>

<script>
import { IonLabel, IonItem, IonNavLink, IonButton, IonInput, IonList  } from "@ionic/vue";
import axios from 'axios';

export default {
  components: {
      IonLabel,
      IonItem,
      IonNavLink,
      IonButton,
      IonInput,
      IonList,
  },

  methods: {
    async registerHandler() {
      try {
        // Send a POST request
        await axios({
          headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          method: 'post',
          url: 'http://localhost:3000/api/customer',
          data: {
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.passwordConfirmation,
            passwordConfirmation: this.passwordConfirmation,
            email: this.email
          }
        });
      }
      catch(e) {
        console.log(e);
      }
    }
  },

  data() {
    return {
      loading: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirmation: "",
      email: "",
    }
  },
}
</script>