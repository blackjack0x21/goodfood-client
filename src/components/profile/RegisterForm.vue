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
                <password-meter :password="password" />
            </ion-item>
            <ion-item>
                <ion-label position="floating">Confirmation mot de passe</ion-label>
                <ion-input type="password" required v-model="passwordConfirmation"/>
                <password-meter :password="passwordConfirmation" />
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
import { IonLabel, IonItem, IonNavLink, IonButton, IonInput, IonList, loadingController  } from "@ionic/vue";
import axios from 'axios';
import PasswordMeter from 'vue-simple-password-meter';
import zxcvbn from 'zxcvbn';

export default {
  components: {
      IonLabel,
      IonItem,
      IonNavLink,
      IonButton,
      IonInput,
      IonList,
      PasswordMeter
  },

  methods: {
    async registerHandler() {
      if(this.formValid() === true) {
        
        const loading = await loadingController
        .create({
          message: 'Creating account',
        });
        
        try {
          await loading.present();
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
        finally {
          loading.dismiss();
        }
      }
    },

    formValid() {
      let isValid = true;
      if(this.password !== this.passwordConfirmation) {
        console.log("passwords do not match");
        isValid = false;
      }

      let passwordStrength = zxcvbn(this.password).score;
      if(passwordStrength < 2) {
        console.log("password too weak : score is : " + passwordStrength);
        isValid = false
      }
      return isValid;
    },
  },

  data() {
    return {
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirmation: "",
      email: "",
    }
  },
}
</script>