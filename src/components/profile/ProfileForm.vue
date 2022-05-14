<template>
    <div>
        Profile
        <ion-button @click="disconnectHandler">Déconnecter</ion-button>
    </div>
</template>

<script lang="ts">
import { IonButton } from '@ionic/vue'
import { supabase } from "../../../supabase"
import notification, { TypeNotification } from '../../../utils/notification';
import { startLoading, stopLoading } from '../../../utils/loader';

export default {
    components: {
        IonButton
    },

    methods: {
        async disconnectHandler() {
            const email = "this.email";
            const password = "this.password";
            if(email && password) {
                try {
                    await startLoading("Loading");
                    const { error } = await supabase.auth.signOut()
                    if (error) throw error
                    notification("Disconnected", TypeNotification.Success);
                } 
                catch(error) {
                    console.log(error);
                    notification("An error occured", TypeNotification.Danger);
                } 
                finally {
                    stopLoading();
                }
            }
        }
    }
}
</script>