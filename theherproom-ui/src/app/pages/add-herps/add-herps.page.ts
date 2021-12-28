import {Component, OnInit, ViewChild} from '@angular/core';
import {HerpsService} from "../../services/herp-service/herps.service";
import {Router} from "@angular/router";
import {LoadingController, MenuController, ModalController, ToastController, PickerController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HerpFormModel} from "../../shared/models/herp-form.model";
import { PickerOptions } from "@ionic/core";



@Component({
  selector: 'app-add-herps',
  templateUrl: './add-herps.page.html',
  styleUrls: ['./add-herps.page.scss'],
})
export class AddHerpsPage implements OnInit {

  @ViewChild('search') search: any;

  loader: any;
  herpForm: FormGroup;
  defaultDate = "1987-06-30";
  isSubmitted = false;
  isDismiss = false;
  public searchResults: Object = [];
  type = 'scientificName';
  public selectedHerp = [];
  selectedMetric: string = "cm";
  //todo - store in DB
  metrics: string[] = [
      "cm",
      "m",
      "in",
      "ft"
  ];




  constructor(
      private herpsService: HerpsService,
      private router: Router,
      private toastController: ToastController,
      private formBuilder: FormBuilder,
      public modalController: ModalController,
      private menuController: MenuController,
      private loadingCtrl: LoadingController,
      private pickerController: PickerController
  ) { }


  ngOnInit() {
    this.herpForm = this.formBuilder.group({
      herp: ['', [Validators.required]],
      length: [''],
      dob: [''],
      breeder: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      dateAcquired: [this.defaultDate]
    })
  }

  async showPicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value:any) => {
            this.selectedMetric = value.Metrics.value;
          console.log(this.selectedMetric);
        }
    }
  ],
      columns:[{
        name:'Metrics',
        options:this.getColumnOptions()
      }]
  };
    let picker = await this.pickerController.create(options);
    picker.present()
  }

  getColumnOptions(){
    let options = [];
    this.metrics.forEach(x => {
      options.push({text:x,value:x});
    });
    return options;
  }




  searchHerp(event){
    if(event.detail.value !== '') {
      this.presentLoading();
        this.herpsService.searchAllHerps(event.detail.value, this.type).subscribe(val => {
          console.log(val);
          this.searchResults = val;
          this.dismiss();
        });
    } else {
      this.searchResults = [];
    }
    this.viewDidEnter();
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

  viewDidEnter(): void {
    setTimeout(() => {
      this.search.setFocus();
    }, 500)
  }


  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.herpForm.get('dob').setValue(date, {
      onlyself: true
    })
  }

  async close() {
    const modal = await this.modalController.getTop();
    modal.dismiss();
  }

  get errorControl() {
    return this.herpForm.controls;
  }

  searchResultSelected(event){
    console.log(event);
    this.selectedHerp = event;
    this.herpForm.controls['herp'].setValue(event.id);
    this.searchResults = [];
    this.search.placeholder = event.name;
  }

  convertMetrics() {
    let length = this.herpForm.getRawValue().length;
    const inConst: number = 2.54;
    const ftConst: number = 30.48;
    const mConst: number = 100;
    switch(this.selectedMetric){
      case 'cm':
        break;
      case 'in':
        length = length * inConst;
        break;
      case 'ft':
        length = length * ftConst;
        break;
      case 'm':
        length = length * mConst;
        break;
    }

    this.herpForm.setValue({
      length: length
    })

  }

  async submitForm() {
    console.log(this.herpForm);
    this.isSubmitted = true;
    if (!this.herpForm.valid) {
      const toast = await this.toastController.create({
        color: 'danger',
        duration: 2000,
        position: 'top',
        message: 'Please Address Errors Before you Submit',
      });

      await toast.present();
      return false;
    } else {
      this.presentLoading();
      this.convertMetrics()
      let newHerp: HerpFormModel = this.herpForm.value;
      this.herpsService.postUserHerp(newHerp).subscribe(async data => {
          this.dismiss();
          console.log("success: " + JSON.stringify(data))
        this.router.navigate(['/']);
        const modal = await this.modalController.getTop();
        modal.dismiss();
        },err => {
          this.dismiss();
        });
    }
  }


}
