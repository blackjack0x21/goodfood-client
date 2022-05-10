import { loadingController } from "@ionic/vue";

let loader: HTMLIonLoadingElement = null;

export async function startLoading(message: string) {
    loader = await loadingController
    .create({
        message: message,
    });
    await loader.present();
}

export async function stopLoading() {
    await loader.dismiss();
}