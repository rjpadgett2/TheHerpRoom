import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {LoadingController, MenuController, ModalController, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();
  errorMessage: string;
  loader: any;



  constructor(
      private authService: AuthService,
      private router: Router,
      private toastController: ToastController,
      private loadingController: LoadingController,
      private menu: MenuController
  ) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  login() {
    this.presentLoading();
    this.authService.login(this.user).subscribe(async data => {
      this.loader.dismiss();
      this.router.navigate(['/']);
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
}
