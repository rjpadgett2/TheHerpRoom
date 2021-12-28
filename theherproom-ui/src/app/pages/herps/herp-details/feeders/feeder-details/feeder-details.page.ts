import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {HerpsService} from "../../../../../services/herp-service/herps.service";
import {FormBuilder} from "@angular/forms";
import {HerpFeeders} from "../../../../../shared/models/herp-feeders.model";

@Component({
  selector: 'app-feeder-details',
  templateUrl: './feeder-details.page.html',
  styleUrls: ['./feeder-details.page.scss'],
})
export class FeederDetailsPage implements OnInit {

  @Input() feeder: HerpFeeders;

  constructor(
      public modalController: ModalController,
      private loadingCtrl: LoadingController,
      private herpsService: HerpsService,
      private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    console.log(this.feeder);
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
