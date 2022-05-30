<template>
  <base-layout pageTitle="Reset" page-default-back-link="/tabs/tab3">
    <form class="ion-padding" @submit.prevent="registerHandler">
      <ion-list>
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
      <ion-button shape="round" type="submit" expand="block">Réinitialiser mdp</ion-button>
    </form>
  </base-layout>
</template>

<script lang="ts">
import { IonLabel, IonItem, IonButton, IonInput, IonList } from "@ionic/vue";
import PasswordMeter from 'vue-simple-password-meter';
import zxcvbn from 'zxcvbn';
import notification, { TypeNotification } from '../../utils/notification';
import { startLoading, stopLoading } from '../../utils/loader';
import { supabase } from '../../supabase'

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
          const accessToken: string | undefined = supabase.auth.session()?.access_token
          if(accessToken) {
            const { error, data } = await supabase.auth.api
            .updateUser(accessToken, { password : this.password })
            if (error) throw error
            notification("Mot de passe réinitialisé", TypeNotification.Success);
          }
          else {
            notification("You need to be logged in", TypeNotification.Danger);
          }
        }
        catch(error) {
          console.log(error);
          notification("An error occured", TypeNotification.Danger);
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
      password: '',
      passwordConfirmation: '',
    }
  },
}
</script>