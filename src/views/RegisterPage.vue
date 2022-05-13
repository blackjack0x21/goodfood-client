<template>
  <base-layout pageTitle="Register" page-default-back-link="/tabs/tab3">
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
      <ion-button shape="round" type="submit" expand="block">S'inscrire</ion-button>
    </form>
  </base-layout>
</template>

<script lang="ts">
import { IonLabel, IonItem, IonButton, IonInput, IonList } from "@ionic/vue";
import axios, { AxiosError } from 'axios';
import PasswordMeter from 'vue-simple-password-meter';
import zxcvbn from 'zxcvbn';
import notification, { TypeNotification } from '../../utils/notification';
import { startLoading, stopLoading } from '../../utils/loader';

export default {
  components: {
      IonLabel,
      IonItem,
      IonButton,
      IonInput,
      IonList,
      PasswordMeter
  },

  methods: {
    async registerHandler() {
      if(this.formValid() === true) {
        try {
          startLoading("Création du compte");
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
          notification("Compte créé, vérifiez votre adresse email", TypeNotification.Success);
        }
        catch(e) {
          const reason = e as AxiosError;
          const responseCode = reason.response?.status;
          console.log(e);
          let message = "";
          if(responseCode === 409) {
            message = "Account already registered";
          }

          if(message === "") {
            message = "An Error has occured";
          }
          notification(message, TypeNotification.Danger);
        }
        finally {
          stopLoading();
        }
      }
    },

    formValid() {
      if(this.password !== this.passwordConfirmation) {
        notification("Passwords do not match", TypeNotification.Danger);
        return false;
      }

      let passwordStrength = zxcvbn(this.password).score;
      if(passwordStrength < 2) {
        notification("Password too weak", TypeNotification.Danger);
        return false
      }
      return true;
    },
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      email: '',
    }
  },
}
</script>