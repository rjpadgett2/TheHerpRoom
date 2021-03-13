import { Component } from '@angular/core';

import {ModalController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth/auth.service";
import {LoginPage} from "./pages/login/login.page";
import {AddHerpsPage} from "./pages/add-herps/add-herps.page";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public modalController: ModalController
  ) {
    this.initializeApp();
  }

  async openAddHerpModal() {
    const modal = await this.modalController.create({
      component: AddHerpsPage
    });
    return await modal.present();
  }

  logout() {
    this.authService.logout();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
