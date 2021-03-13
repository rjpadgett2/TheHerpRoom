import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IonSearchbar, LoadingController, MenuController} from "@ionic/angular";
import {HerpsService} from "../../../services/herp-service/herps.service";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.scss'],
})
export class MultiStepFormComponent implements OnInit {

  @ViewChild('search') search: any;

  @ViewChild('formSlider') formSlider;

  public submitAttempt: boolean = false;

  @Input() formContent: any;

  @Input() searchType?: string;

  @Output() readonly formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [{
    type: 'stepper',
  }]

  activeStepIndex: number;
  currentFormContent: Array<any>;
  formData: any;
  formFields: Array<Array<string>>;
  masterFormFields: Array<string>;
  stepItems: Array<any>;
  masterForm: Array<FormGroup>;
  type: string;
  loader: any;
  public searchResults: Object = [];
  searchTypes: string[] = ['herps', 'user', 'feeders'];
  isDismiss = false;
  public allHerps: Object = [];
  public selectedHerp;

  constructor(
      private readonly _formBuilder: FormBuilder,
      private menuController: MenuController,
      private loadingCtrl: LoadingController,
      private herpsService: HerpsService
  ) {}

  ngOnInit() {

    // TODO: add interfaces and enums wherever appropriate
    this.type = 'scientificName';
    this.activeStepIndex = 0;
    this.masterForm = [];
    this.currentFormContent = [];
    this.formFields = [];
    this.stepItems = this.formContent;
    this.selectedHerp = this.searchType === 'herps' ? [] : null

  }


  onSubmit(form) {
    if (this.form.valid) {
      alert(JSON.stringify(this.model, null, 2));
    }
    // this.formSubmit.emit(this.formData);
  }

  _ionChange(event){
    if(event.detail.value !== '') {
      this.presentLoading();
      if (this.searchType === 'herps') {
        this.herpsService.searchAllHerps(event.detail.value, this.type).subscribe(val => {
          this.searchResults = val;
          this.dismiss();

        });
      } else {
        this.searchResults = [];
      }
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

  searchResultSelected(event){
    this.selectedHerp = event;
    this.searchResults = [];
    this.search.placeholder = event[1];
  }

  next(){
      this.formSlider.slideNext();
    }

  prev(){
    this.formSlider.slidePrev();
  }
}
