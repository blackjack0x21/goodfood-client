<template>
    <base-layout pageTitle="Mot de passe oublié" page-default-back-link="/tabs/tab3">
        <form class="ion-padding" @submit.prevent="resetPasswordHandler">
            <ion-list>
                <ion-item>
                    <ion-label position="floating">Email</ion-label>
                    <ion-input type="email" required v-model="email" />
                </ion-item>
            </ion-list>
            <ion-button shape="round" type="submit" expand="block">Envoyer un mail</ion-button>
        </form>
    </base-layout>
</template>

<script>

import{ IonList, IonItem, IonButton, IonLabel, IonInput } from '@ionic/vue';
import notification, { TypeNotification } from '../../utils/notification';
import { startLoading, stopLoading } from '../../utils/loader';
import { supabase } from '../../supabase'

export default {    
    components: {  
        IonList, IonItem, IonButton, IonLabel, IonInput
    },
    data () {
        return{
            email:''
        }
    },
    methods: {
        async resetPasswordHandler() {
            await startLoading("Loading");
            const resetUrl = `${process.env.VUE_APP_LOCAL_URL}/reset`;
            console.log("resetUrl");
            console.log(resetUrl);
            await supabase.auth.api.resetPasswordForEmail(this.email, {
                // redirectTo: 'http://localhost:8080/reset'
                redirectTo: resetUrl
            })
            notification("Demande effectuée, verifiez votre adresse email", TypeNotification.Success);
            stopLoading();
        }
    }
}
</script>