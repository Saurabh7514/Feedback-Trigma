import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: HTMLIonLoadingElement | null = null;
  private timeout: any = null;

  isLoading = false;

  constructor(private loadingController: LoadingController, private toastCtrl: ToastController) {}


  async showLoader() {
    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: "custom-loader",
      message: "Please wait...",
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        // console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => {
            // console.log('abort presenting')
          });
        }
      });
    });
  }

  async hideLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then( (res) => {
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            toast.onDidDismiss();
          }
        }
      ]
    });

    await toast.present();
  }

  
  
}
