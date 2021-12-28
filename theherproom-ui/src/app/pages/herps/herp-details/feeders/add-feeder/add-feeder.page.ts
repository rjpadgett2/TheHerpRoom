import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HerpsService} from "../../../../../services/herp-service/herps.service";
import {Feeders} from "../../../../../shared/models/feeders.model";
import {HerpFormModel} from "../../../../../shared/models/herp-form.model";
import {Herp} from "../../../../../shared/models/herp.model";

@Component({
  selector: 'app-add-feeder',
  templateUrl: './add-feeder.page.html',
  styleUrls: ['./add-feeder.page.scss'],
})
export class AddFeederPage implements OnInit {

  loader: any;
  isSubmitted = false;
  isDismiss = false;
  form: FormGroup;
  feeders: Feeders[];

  @Input() herp: Herp;

  constructor(
      public modalController: ModalController,
      private loadingCtrl: LoadingController,
      private herpsService: HerpsService,
      private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      feeders: ['', [Validators.required]],
      createdDate: ['', [Validators.required]],
      customWeight: [],
      customLength: ['']
    });

    this.herpsService.getAllFeeders().subscribe(async data => {
      this.feeders = data;
    })
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


  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  submitForm() {
    console.log(this.form);
    this.presentLoading();
    let newFeeder: Feeders = this.form.value;
    this.herpsService.postHerpFeeders(newFeeder, this.herp.id).subscribe(async data => {
      this.dismiss();
      this.dismissModal();
    },err => {
      this.dismiss();
      this.dismissModal();
    });
  }

}
