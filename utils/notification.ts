import '../src/styles/toast.css';
import { toastController } from "@ionic/vue";

export enum TypeNotification {
  Danger = "danger",
  Success = "success"
}

export default async function notification(message: string, typeNotification: TypeNotification) {
    const toast = await toastController
      .create({
        message: message,
        duration: 2000,
        position: "bottom",
        cssClass: 'toast'
      })

    toast.color = typeNotification;
    return toast.present()
}