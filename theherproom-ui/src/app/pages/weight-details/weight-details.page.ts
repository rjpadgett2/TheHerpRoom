import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-weight-details',
  templateUrl: './weight-details.page.html',
  styleUrls: ['./weight-details.page.scss'],
})
export class WeightDetailsPage implements OnInit {

  constructor(
      public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
