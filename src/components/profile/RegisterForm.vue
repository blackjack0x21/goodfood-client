<template>
    <form class="ion-padding" @submit.prevent="handleLogin">
        <ion-list>
            <ion-item>
                <ion-label position="floating">Nom</ion-label>
                <ion-input type="text" required  v-model="nom"/>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Prenom</ion-label>
                <ion-input type="text" required  v-model="prenom"/>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input type="email" required v-model="email"/>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Mot de passe</ion-label>
                <ion-input type="password" required v-model="mdp"/>
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
import { supabase } from "../../../supabase"
import { ref } from "vue"

export default {
    components: {
        IonLabel,
        IonItem,
        IonNavLink,
        IonButton,
        IonInput,
        IonList,
    },
    setup() {
    const loading = ref(false)
    const email = ref("")

    const handleLogin = async () => {
      try {
        loading.value = true
        const { error } = await supabase.auth.signIn({ email: email.value })
        if (error) throw error
        alert("Check your email for the login link!")
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      email,
      handleLogin,
    }
  },
}
</script>