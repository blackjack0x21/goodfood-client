<template>
    <base-layout pageTitle="Pizza" page-default-back-link="/tabs/tab1">
        <template v-slot:actions-end>
            <ion-fab-button class="button-right">
                <ion-icon :icon="cartSharp">
                </ion-icon>
            </ion-fab-button>
        </template>
        <div>

        </div>
    </base-layout>
</template>

<script lang="ts">
    import { IonIcon } from '@ionic/vue';
    import { cartSharp } from 'ionicons/icons';
    import '../styles/index.css'

    export default {
        components: { IonIcon },
        setup() {
            return {
                cartSharp,
            }
        }
    }
</script>