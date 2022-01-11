import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {ErrorMessageComponent} from "../../shared/components/error-message/error-message.component";
import {LoadingController, MenuController, ToastController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsernameValidatorComponent} from "../../shared/validators/username-validator/username-validator.component";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  errorMessage: string;
  loader: any;
  isDismiss = false;
  isSubmitted: boolean = false;
  resetPasswordForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private errors: ErrorMessageComponent,
              private toastController: ToastController,
              private formBuilder: FormBuilder,
              private menuController: MenuController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.resetPasswordForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]

    })
    this.menuController.enable(false);
  }

  async resetPassword(){
    this.isSubmitted = true;
    let error: string = "";

    if(this.resetPasswordForm.valid){
      this.presentLoading();
      //Set User Values
      let email = this.resetPasswordForm.get('email').value;

      this.authService.resetPassword(email).subscribe(async data=> {
        this.dismiss();
        this.router.navigate(['/landing/tabs/herps']);
      },async err => {
        error = err.error.message;
        const toastError = await this.toastController.create({
          color: 'danger',
          duration: 2000,
          position: 'top',
          message: error,
        });
        this.dismiss();
        await toastError.present();
      });

      return false;
    }else{
      const toast = await this.toastController.create({
        color: 'danger',
        duration: 2000,
        position: 'top',
        message: 'Please Address Errors Before you Submit',
      });

      await toast.present();
      return false;
    }
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
}
