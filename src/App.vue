<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import notification, { TypeNotification } from '../utils/notification';
import { startLoading, stopLoading } from '../utils/loader';
import { supabase } from '../supabase';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },

  created() {
    // This method is called when the page is closing
    window.addEventListener('beforeunload', (event) => {
        const stayLogged = localStorage.getItem('stayLogged');
        if(stayLogged === 'false' || !stayLogged) {
          // Log out the user and then clear the local storage
          this.signOut();
          localStorage.clear();
        }
    });
  },

  methods: {
    // Method that signs out the user
    async signOut() {
      try {
        console.log("signOut function");
          await startLoading("Loading");
          const { error } = await supabase.auth.signOut()
          if (error) throw error
          localStorage.clear();
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
});
</script>