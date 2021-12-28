import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../shared/models/user.model";
import {LoadingController, MenuController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsernameValidatorComponent} from "../../shared/validators/username-validator/username-validator.component";
import {PasswordValidatorComponent} from "../../shared/validators/password-validator/password-validator.component";
import {ErrorMessageComponent} from "../../shared/components/error-message/error-message.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  errorMessage: string;
  loader: any;
  isDismiss = false;
  isSubmitted: boolean = false;
  registrationForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private errors: ErrorMessageComponent,
              private toastController: ToastController,
              private formBuilder: FormBuilder,
              private menuController: MenuController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username : ['', [
          Validators.required,
        UsernameValidatorComponent.validUsername,
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.maxLength(25),
        Validators.minLength(5),
      ]],
      email : ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')

      ]],
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
      ])),

    }, {
      validators: this.password.bind(this),
    })
    this.menuController.enable(false);

  }


  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }


  async register(){
    this.isSubmitted = true;
    let error: string = "";

    if(this.registrationForm.valid){
      this.presentLoading();
      let user: User = new User();
      //Set User Values
      user.username = this.registrationForm.get('username').value;
      user.password = this.registrationForm.get('password').value;
      user.email = this.registrationForm.get('email').value;

      this.authService.register(user).subscribe(async data=> {
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

  get errorControl() {
    return this.registrationForm.controls;
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
