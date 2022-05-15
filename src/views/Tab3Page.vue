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
      <login-form v-else />
  </base-layout>
</template>

<script>
import { IonIcon, IonImg } from '@ionic/vue';
import { cartSharp } from 'ionicons/icons';
import { store } from "./store"
import { supabase } from "../../supabase"
import LoginForm from "../components/profile/LoginForm.vue"
import ProfileForm from "../components/profile/ProfileForm.vue"
import '../styles/index.css'
export default  {
  components: { IonIcon, IonImg, ProfileForm, LoginForm },
  setup() {
    store.user = supabase.auth.user()
    supabase.auth.onAuthStateChange((_, session) => {
      if(session !== null) {
        store.user = session.user
      }
      else {
        store.user = null
      }
    })
    
    return {
      cartSharp,
      store,
    }
  },

  data() {
    return {
    }
  },
}
</script>