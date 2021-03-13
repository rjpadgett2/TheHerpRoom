import { Component, OnInit } from '@angular/core';
import {HerpsService} from "../../services/herp-service/herps.service";
import {UserHerps} from "../../shared/models/user-herps.model";
import {NavigationExtras, Router} from "@angular/router";
import {AlertController, LoadingController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-herps',
  templateUrl: './herps.page.html',
  styleUrls: ['./herps.page.scss'],
})
export class HerpsPage implements OnInit {

  herps: UserHerps[];
  loader: any;
  isSubmitted = false;
  isDismiss = false;

  constructor(
      private herpsService: HerpsService,
      private router: Router,
      private alertController: AlertController,
      private loadingCtrl: LoadingController,
      public navCtrl: NavController
  ) { }

  ngOnInit() {
   this.getHerps(null);
  }

  getHerps(event) {
    this.herpsService.getAllUserHerps().subscribe(async data => {
      this.herps = data
      if (event)
        event.target.complete();
    },err => {
      console.log(err)
      if (event)
        event.target.complete();
    });
  }

  moreInfo(herp: UserHerps){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        herp: JSON.stringify(herp)
      }
    };
    this.navCtrl.navigateForward(['/','landing', 'tabs', 'herps', herp.id], navigationExtras);
  }

  delete(id: string){
    this.presentLoading();
    this.herpsService.deleteUserHerp(id).subscribe(data => {
      this.dismiss();
      console.log("success: " + data)
    },err => {
      this.dismiss();
    });
  }

  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loader.present().then(()=> {
      if(this.isDismiss){
        this.loader.dismiss();
      }
    });
  }

  async dismiss() {
    this.isDismiss = true;
    if(!this.loader){
      return;
    }
    return await this.loader.dismiss().then(() => console.log('dismissed'));
  }

  async presentAlertConfirm(herp: UserHerps) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '<strong>Are you sure you want to permanently delete this herp from your collection</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.delete(herp.id);
          }
        }
      ]
    });

    await alert.present();
  }

}
