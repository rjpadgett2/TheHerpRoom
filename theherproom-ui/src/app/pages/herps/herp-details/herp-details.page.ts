import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {HerpsService} from "../../../services/herp-service/herps.service";
import {AlertController, LoadingController, ModalController, NavController} from "@ionic/angular";
import {UserHerps} from "../../../shared/models/user-herps.model";
import {Chart} from 'chart.js';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HerpFormModel} from "../../../shared/models/herp-form.model";
import {HerpFeeders} from "../../../shared/models/herp-feeders.model";
import {AddFeederPage} from "./feeders/add-feeder/add-feeder.page";
import {FeederDetailsPage} from "./feeders/feeder-details/feeder-details.page";
import { DatePipe}  from "@angular/common";
import {Length} from "../../../shared/models/herp-length.model";
import {Weight} from "../../../shared/models/herp-weight.model";
import {LengthDetailsPage} from "../../length-details/length-details.page";
import {AddLengthPage} from "../../add-length/add-length.page";
import {AddWeightPage} from "../../add-weight/add-weight.page";

@Component({
  selector: 'app-herp-details',
  templateUrl: './herp-details.page.html',
  styleUrls: ['./herp-details.page.scss'],
})
export class HerpDetailsPage implements OnInit {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('feederDoughnutCanvas') feederDoughnutCanvas;
  @ViewChild('lengthLineCanvas') lengthLineCanvas;
  @ViewChild('weightLineCanvas') weightLineCanvas;

  feederDoughnutChart: any;
  lengthLineChart: any;
  weightLineChart: any;
  loader: any;
  isSubmitted: boolean = false;
  isDismiss: boolean = false;
  loadedHerp: UserHerps;
  isReadOnly: boolean = true;
  herpForm: FormGroup;
  herpId: string;
  herpFeeders: HerpFeeders[];
  herpLengths: Length[];
  herpWeights: Weight[];
  feedersLabels: any[];
  lengthLabels: any[] = [];
  weightLabels: any[] = [];
  feederDataValues: any[] = [];
  lengthDataValues: any[] = [];
  weightDataValues: any[] = [];
  isEditFeeders: boolean = false;
  isEditLengths: boolean = false;
  isEditWeights: boolean = false;


  constructor(
      private activatedRoute: ActivatedRoute,
      private herpsService: HerpsService,
      private router: Router,
      public datepipe: DatePipe,
      public modalController: ModalController,
      private formBuilder: FormBuilder,
      private alertController: AlertController,
      private loadingCtrl: LoadingController,
      public navCtrl: NavController

  ) { }

  ngAfterViewInit(){

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.loadedHerp = JSON.parse(params["herp"]);
      }
    });

    this.herpsService.getAllHerpFeeders(this.loadedHerp.id).subscribe(async data => {
      this.herpFeeders = data;
      this.generateFeederLabels();
      this.generateCharts();
    })

    this.herpsService.getHerpLengths(this.loadedHerp.id).subscribe( async data => {
      console.log(data);
      this.herpLengths = data;
      this.generateLengthLabels();

    })

    this.herpsService.getHerpWeights(this.loadedHerp.id).subscribe( async data => {
      console.log(data);
      this.herpWeights = data;
      this.generateWeightLabels();
    })

    this.herpForm = this.formBuilder.group({
      sex: [''],
      breeder: [''],
      dateAcquired: [],
      dob: [''],
      length: [''],
      weight: [''],
      feeder: ['']
    })
  }

  generateWeightLabels() {
    this.herpWeights.sort((a,b) => a.date > b.date ? 1 : -1);
    this.herpWeights.forEach((item) => {
      this.weightLabels.push(this.datepipe.transform(item.date, 'dd-MM-yyyy'));
      this.weightDataValues.push(item.weight);
    });
  }

  generateLengthLabels() {
    this.herpLengths.sort((a,b) => a.date > b.date ? 1 : -1);
    this.herpLengths.forEach((item) => {
      this.lengthLabels.push(this.datepipe.transform(item.date, 'dd-MM-yyyy'));
      this.lengthDataValues.push(item.length);
    });
  }

  generateFeederLabels() {
    let arr = new Set();
    let map = new Map();
    this.herpFeeders.forEach((item) => {
      arr.add(item.feeder.commonName.toString());
      if(arr.has(item.feeder.commonName) && !map.has(item.feeder.commonName)){
        map.set(item.feeder.commonName, 1);
      }else if(arr.has(item.feeder.commonName) && map.has(item.feeder.commonName)){
        let number = map.get(item.feeder.commonName);
        number += 1;
        map.set(item.feeder.commonName, number);
      }
    })
    //Calculate Percentages
    let total = 0;
    map.forEach(v => {
      total += v;
    })

    arr.forEach(item => {
      this.feederDataValues.push(map.get(item));
    })

    this.feederDataValues.forEach( (value, index, arr) => {
      arr[index] = (value / total) * 100;
    })

    this.feedersLabels = [...arr];
  }


  generateCharts() {
    this.feederDoughnutChart = new Chart(this.feederDoughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.feedersLabels,
        datasets: [{
          label: '# of Votes',
          data: this.feederDataValues,
          backgroundColor: [
            'rgba(255, 0, 0, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          hoverBackgroundColor: [
            "#ff6963",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }
    });



    this.lengthLineChart = new Chart(this.lengthLineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.lengthLabels,
        datasets: [
          {
            label: "Lengths",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.lengthDataValues,
            spanGaps: false,
          },
        ]
      }

    });

    this.weightLineChart = new Chart(this.weightLineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.lengthLabels,
        datasets: [
          {
            label: "Weight",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(255, 165, 0)",
            borderColor: "rgba(255, 94, 0, 0.8)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.weightDataValues,
            spanGaps: false,
          }
        ]
      }

    });
  }

  async delete(id: string){
    this.presentLoading();
    console.log("data");
    this.herpsService.deleteUserHerp(id).subscribe(async data => {
      this.dismiss();
      console.log("data");
      this.showCompleteAlert();
      await this.navCtrl.back();
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

  async onDelete(herp: UserHerps) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Deletion',
      message: ' <strong>Are You sure you want to delete this herp?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Yes',
          handler: () => {
            this.delete(herp.id)
          }
        }
      ]
    });

    await alert.present();
  }

  onEdit() {
    this.isReadOnly = false;
  }

  viewAllFeeders() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        feeders: JSON.stringify(this.herpFeeders),
        herp: JSON.stringify(this.loadedHerp)
      }
    };
    this.navCtrl.navigateForward(['/','landing', 'tabs', 'herps', this.loadedHerp.id, 'feeders'], navigationExtras);
  }

  viewAllWeights() {
    this.isEditWeights = !this.isEditWeights;
    if(!this.isEditWeights){
      setTimeout(() => {
        this.generateCharts();
      }, 10);
    }
  }

  viewAllLengths() {
    this.isEditLengths = !this.isEditLengths;
    if(!this.isEditLengths){
      setTimeout(() => {
        this.generateCharts();
      }, 10);
    }
  }

  submitForm() {
    this.presentLoading();
    let newHerp: HerpFormModel = this.herpForm.value;
    this.herpsService.editUserHerp(newHerp, this.loadedHerp.id).subscribe(async data => {
      this.dismiss();
      console.log("success: " + JSON.stringify(data))
      this.isReadOnly = true;
    },err => {
      this.dismiss();
      this.isReadOnly = true;
    });

  }


  cancel() {
    this.isReadOnly = true;
  }

  async showCompleteAlert() {
    const alert = await this.alertController.create({
      header: 'Complete!',
      message: 'Your Herp Was Succesfully Deleted',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAddLengthModal() {
    const modal = await this.modalController.create({
      component: AddLengthPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'herp': this.loadedHerp,
      }
    });
    return await modal.present();
  }

  async presentLengthDetailsModal(length: Length) {
    const modal = await this.modalController.create({
      component: LengthDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'length': length,
      }
    });
    return await modal.present();
  }

  async presentAddWeightModal() {
    const modal = await this.modalController.create({
      component: AddWeightPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'herp': this.loadedHerp,
      }
    });
    return await modal.present();
  }

  async presentWeightDetailsModal(weight: Weight) {
    const modal = await this.modalController.create({
      component: FeederDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'weight': weight,
      }
    });
    return await modal.present();
  }





}
