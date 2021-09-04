import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  loading: any;

  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}

  async presentToast(msg) {
    let toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'top',
    });

    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      spinner: 'circular',
      duration: 0,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'ion-loading-class',
      backdropDismiss: true,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  cancelLoading() {
    this.loading.dismiss();
  }
}
