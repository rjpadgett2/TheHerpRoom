import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {HerpFeeders} from "../../shared/models/herp-feeders.model";
import {Length} from "../../shared/models/herp-length.model";

@Component({
  selector: 'app-add-length',
  templateUrl: './add-length.page.html',
  styleUrls: ['./add-length.page.scss'],
})
export class AddLengthPage implements OnInit {

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
