import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {LoginPage} from "../login/login.page";
import {RegisterPage} from "../register/register.page";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit() {

  }

  async openModal() {
    this.router.navigate(['../login']);
  }

  async registerModal() {
    this.router.navigate(['../register']);
  }

}
