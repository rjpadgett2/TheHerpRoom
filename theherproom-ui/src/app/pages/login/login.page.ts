import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {LoadingController, MenuController, ModalController} from "@ionic/angular";

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
      public modalController: ModalController,
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
      const modal = await this.modalController.getTop();
      modal.dismiss();

    }, err => {
      this.errorMessage = "Username or Password is incorrect";
      this.loader.dismiss();
    });
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: "Please wait..."
    });
    await this.loader.present();
  }
}
