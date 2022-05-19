<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
                    <slot name="actions-start"></slot>
                </ion-buttons>
                <ion-title>{{ pageTitle }}</ion-title>
                <ion-buttons slot="end" router-link="/basket/">
                    <slot name="actions-end"></slot>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <slot></slot>
        </ion-content>
    </ion-page>
</template>

<script>
import { 
IonPage, 
IonHeader, 
IonToolbar, 
IonTitle, 
IonContent,
IonBackButton,
IonButtons,
} from '@ionic/vue'

export default {
    props: ['pageTitle', "pageDefaultBackLink"],
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonBackButton,
        IonButtons
    }
}
</script>