import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Feeders} from "../../../../shared/models/feeders.model";
import {AddFeederPage} from "./add-feeder/add-feeder.page";
import {HerpFeeders} from "../../../../shared/models/herp-feeders.model";
import {FeederDetailsPage} from "./feeder-details/feeder-details.page";
import {AlertController, LoadingController, ModalController, NavController} from "@ionic/angular";
import {UserHerps} from "../../../../shared/models/user-herps.model";
import {HerpsService} from "../../../../services/herp-service/herps.service";

@Component({
  selector: 'app-feeders',
  templateUrl: './feeders.page.html',
  styleUrls: ['./feeders.page.scss'],
})
export class FeedersPage implements OnInit {

  feeders: Feeders[];
  herp: UserHerps;
  loader: any;
  isDismiss: boolean = false;

  constructor(
      private activatedRoute: ActivatedRoute,
      public modalController: ModalController,
      private alertController: AlertController,
      private loadingCtrl: LoadingController,
      public navCtrl: NavController,
  private herpsService: HerpsService
  ) { }

  ngOnInit() {
    this.getRouteData();
  }

  update() {
    this.getRouteData();
  }

  getRouteData() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.feeders = JSON.parse(params["feeders"]);
        this.herp = JSON.parse(params["herp"]);
      }
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

  async presentAddFeederModal() {
    const modal = await this.modalController.create({
      component: AddFeederPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'herp': this.herp,
      }
    });
    return await modal.present();
  }

  async presentFeederDetailsModal(feeder: HerpFeeders) {
    const modal = await this.modalController.create({
      component: FeederDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'feeder': feeder,
      }
    });
    return await modal.present();
  }

  async deleteHerpFeeders(feederId: string) {
    let decion: boolean;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Are you sure you want to delete this feeder entry.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            decion = false;
          }
        }, {
          text: 'Okay',
          handler: () => {
            decion = true;
          }
        }
      ]
    });
    await alert.present();
    alert.onDidDismiss().then((data) => {
      if(decion){
        this.presentLoading();
        this.herpsService.deleteHerpFeeders(this.herp.id, feederId).subscribe(async data => {
          this.dismiss();
          location.reload();
          console.log("success: " + JSON.stringify(data))
        },err => {
          this.dismiss();
          console.log(err);
        });
      }else{
        return;
      }
    });

  }

}
