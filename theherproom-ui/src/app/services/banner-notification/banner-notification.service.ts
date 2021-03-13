import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";
import * as Hammer from 'hammerjs';
@Injectable({
  providedIn: 'root'
})
export class BannerNotificationService {
  TOAST_DEFAULTS = {
    duration: 3000,
    position: 'top'
  };
  constructor(private toastCtrl: ToastController) {}

  async showBanner(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: this.TOAST_DEFAULTS.duration
    });
     await toast.present();
    // console.log('toast elemet Ref', toast.getNav());
    console.log('toast elemet Ref', document.querySelector('div.toast-portal'));
    const swipeGestureHandler = new Hammer(toast);
    swipeGestureHandler.get('swipe').set({ direction: Hammer.DIRECTION_LEFT });
    toast.onDidDismiss((data, role) => {
      console.log('dismissing banner', data, 'role is', role);
      swipeGestureHandler.on('swipe', () => {
        console.log('dismissing on swipe');
        toast.dismiss();
      });
      if (role === 'close') {
        console.log('clicking on the banner notification');

      }
    });
  }

}
