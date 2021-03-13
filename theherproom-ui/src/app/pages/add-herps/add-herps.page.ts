import {Component, OnInit, ViewChild} from '@angular/core';
import {HerpsService} from "../../services/herp-service/herps.service";
import {Router} from "@angular/router";
import {LoadingController, MenuController, ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HerpFormModel} from "../../shared/models/herp-form.model";


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



  constructor(
      private herpsService: HerpsService,
      private router: Router,
      private formBuilder: FormBuilder,
      public modalController: ModalController,
      private menuController: MenuController,
      private loadingCtrl: LoadingController
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

  searchHerp(event){
    if(event.detail.value !== '') {
      this.presentLoading();
        this.herpsService.searchAllHerps(event.detail.value, this.type).subscribe(val => {
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

  get errorControl() {
    return this.herpForm.controls;
  }

  searchResultSelected(event){
    this.selectedHerp = event;
    this.searchResults = [];
    this.search.placeholder = event.name;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.herpForm.valid) {
      console.log('Please provide all the required values!: ')
      return false;
    } else {
      this.presentLoading();
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
