import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormlyModule} from "@ngx-formly/core";
import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { LandingPage } from './landing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyIonicModule,
    LandingPageRoutingModule
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}
