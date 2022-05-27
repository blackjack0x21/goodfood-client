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
      <div class="ion-text-center" id="rgpd">
        <ion-nav-link router-link="/rgpd/">Consulter et accepter la RGPD</ion-nav-link>
        <ion-icon :icon="checkmarkCircleSharp" color="success" class="rgpd-icon animate__animated animate__flipInY checkmark-circle" v-if="rgpdStore.getRgpdState"></ion-icon>
        <ion-icon :icon="closeCircleSharp" color="danger" class="rgpd-icon animate__animated animate__rotateIn close-circle" v-else></ion-icon>
      </div>
      <ion-button id="pbregister" shape="round" type="submit" expand="block">S'inscrire</ion-button>
    </form>
  </base-layout>
</template>

<script lang="ts">
import { IonLabel, IonItem, IonButton, IonInput, IonList, IonNavLink, IonIcon} from "@ionic/vue";
import axios, { AxiosError } from 'axios';
import PasswordMeter from 'vue-simple-password-meter';
import zxcvbn from 'zxcvbn';
import notification, { TypeNotification } from '../../utils/notification';
import { startLoading, stopLoading } from '../../utils/loader';
import '../styles/registerpage.css'
import { useRgpdStore } from '@/stores/rgpd'
import { checkmarkCircleSharp, closeCircleSharp } from 'ionicons/icons';
import 'animate.css';

export default {
  components: {
      IonLabel,
      IonItem,
      IonButton,
      IonInput,
      IonList,
      PasswordMeter,
      IonNavLink,
      IonIcon
  },

  setup() {
    let rgpdStore = useRgpdStore();

    return {
      checkmarkCircleSharp,
      closeCircleSharp,
      rgpdStore
    }
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
      const accepted = this.rgpdStore.getRgpdState;

      if(accepted === false) {
        notification("Vous devez accepter la RGPD", TypeNotification.Danger);
        return false;
      }

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