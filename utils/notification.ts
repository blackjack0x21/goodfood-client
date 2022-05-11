import '../src/styles/toast.css';
import { toastController } from "@ionic/vue";

export enum TypeNotification {
  Danger,
  Success
}

export default async function notification(message: string, typeNotification: TypeNotification) {
    const toast = await toastController
      .create({
        message: message,
        duration: 2000,
        position: "bottom",
        cssClass: 'toast'
      })

      if(typeNotification === TypeNotification.Success) {
        toast.color = "success";
      }

      if(typeNotification === TypeNotification.Danger) {
        toast.color = "danger";
      }
    return toast.present()
}