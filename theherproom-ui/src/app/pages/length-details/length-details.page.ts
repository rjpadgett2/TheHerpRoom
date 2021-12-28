import {Component, Input, OnInit} from '@angular/core';
import {Length} from "../../shared/models/herp-length.model";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-length-details',
  templateUrl: './length-details.page.html',
  styleUrls: ['./length-details.page.scss'],
})
export class LengthDetailsPage implements OnInit {

  @Input() length: Length;

  constructor(
      public modalController: ModalController
  ) { }

  ngOnInit() {
    console.log(this.length);
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
