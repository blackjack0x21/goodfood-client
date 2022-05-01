<template>
  <base-layout pageTitle="Profil">
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
      <profile-form v-if="store.user" />
      <register-form v-else />
  </base-layout>
</template>

<script>
import { IonIcon, IonImg } from '@ionic/vue';
import { cartSharp } from 'ionicons/icons';
import { store } from "./store"
import { supabase } from "../../supabase"
import RegisterForm from "../components/profile/RegisterForm.vue"
import ProfileForm from "../components/profile/ProfileForm.vue"
import '../styles/index.css'
export default  {
  components: { IonIcon, IonImg, RegisterForm, ProfileForm },
  setup() {
    store.user = supabase.auth.user()
    supabase.auth.onAuthStateChange((_, session) => {
      store.user = session.user
    })

    return {
      cartSharp,
      store,
    }
  },
}
</script>