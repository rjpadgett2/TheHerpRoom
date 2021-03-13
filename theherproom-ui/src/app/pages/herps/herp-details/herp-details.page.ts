import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HerpsService} from "../../../services/herp-service/herps.service";
import {AlertController, LoadingController, NavController} from "@ionic/angular";
import {UserHerps} from "../../../shared/models/user-herps.model";
import {Chart} from 'chart.js';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HerpFormModel} from "../../../shared/models/herp-form.model";

@Component({
  selector: 'app-herp-details',
  templateUrl: './herp-details.page.html',
  styleUrls: ['./herp-details.page.scss'],
})
export class HerpDetailsPage implements OnInit {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  loader: any;
  isSubmitted: boolean = false;
  isDismiss: boolean = false;
  loadedHerp: UserHerps;
  isReadOnly: boolean = true;
  herpForm: FormGroup;
  herpId: string;


  constructor(
      private activatedRoute: ActivatedRoute,
      private herpsService: HerpsService,
      private router: Router,
      private formBuilder: FormBuilder,
      private alertController: AlertController,
      private loadingCtrl: LoadingController,
      public navCtrl: NavController

  ) { }

  ngAfterViewInit() {
    // this.barChart = new Chart(this.barCanvas.nativeElement, {
    //   type: 'bar',
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    //
    // });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Red", "Blue", "Yellow", "pink", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
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
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          }
        ]
      }

    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.loadedHerp = JSON.parse(params["herp"]);
      }
    });

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



}
