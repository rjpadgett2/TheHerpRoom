import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {LoginPage} from "../login/login.page";
import {RegisterPage} from "../register/register.page";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  loginForm: FormGroup;
  user: User = new User();
  errorMessage: string;
  loader: any;

  constructor(
      private authService: AuthService,
      private router: Router,
      private formBuilder: FormBuilder,
      private toastController: ToastController,
      private loadingController: LoadingController,
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group( {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this.presentLoading();
    let user: User = new User();
    user.username = this.loginForm.get('username').value;
    user.password = this.loginForm.get('password').value;
    this.authService.login(user).subscribe(async data => {
      this.loader.dismiss();
      this.loginForm.reset();
      this.router.navigate(['/landing/tabs/herps']);
    }, async err => {
      this.loader.dismiss();
      const toast = await this.toastController.create({
        color: 'danger',
        duration: 2000,
        position: 'top',
        message: 'Username or Password is incorrect',
      });
      toast.present();

    });
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: "Please wait..."
    });
    await this.loader.present();
  }

  registration() {
    this.router.navigate(['../register']);
  }

}
