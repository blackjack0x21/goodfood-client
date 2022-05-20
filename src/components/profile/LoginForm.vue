<template>
    <form class="ion-padding" @submit.prevent="loginHandler">
        <ion-list>
            <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input type="email" required  v-model="email"/>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Mot de passe</ion-label>
                <ion-input type="password" required v-model="password"/>
            </ion-item>
        </ion-list>
        <ion-button shape="round" type="submit" expand="block">Connexion</ion-button>
        <ion-item>
            <ion-checkbox 
                slot="start" 
                @update:modelValue="stayLogged = $event"
                :modelValue="stayLogged">
            </ion-checkbox>
            <ion-label>Rester connecté</ion-label>
        </ion-item>
    </form>
    <div class="ion-text-center">
        <ion-nav-link router-link="/register/">Inscription</ion-nav-link>
    </div>
    <br>
    <div class="ion-text-center">
        <ion-nav-link router-link="/forgot/">Mot de passe oublié?</ion-nav-link>
    </div>
</template>

<script lang="ts">
import { IonCheckbox, IonLabel, IonItem, IonNavLink, IonButton, IonInput, IonList } from "@ionic/vue";
import { supabase } from '../../../supabase';
import notification, { TypeNotification } from '../../../utils/notification';
import { startLoading, stopLoading } from '../../../utils/loader';
import { ApiError } from '@supabase/gotrue-js';

export default {
    components: {
        IonCheckbox,
        IonLabel,
        IonItem,
        IonNavLink,
        IonButton,
        IonInput,
        IonList
    },

    methods : {
        async loginHandler() {
            const email = this.email;
            const password = this.password;
            const stayLogged = this.stayLogged
            if(email && password) {
                try {
                    await startLoading("Loading");
                    const { user, session, error } = await supabase.auth.signIn({
                        email: email,
                        password: password,
                    },
                    {
                        shouldCreateUser: false
                    })
                    if (error) throw error
                    if(stayLogged) {
                        localStorage.setItem('stayLogged', 'true');
                    }
                    else {
                        localStorage.setItem('stayLogged', 'false');
                    }
                    notification("Connected", TypeNotification.Success);
                } 
                catch (error: ApiError | any) {
                    notification(error.error_description || error.message, TypeNotification.Danger);
                } 
                finally {
                    stopLoading();
                }
            }
        },
    },

    data () {
        return{
            email:'',   
            password: '',
            stayLogged: false
        }
    },
}
</script>