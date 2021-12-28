import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LengthDetailsPageRoutingModule } from './length-details-routing.module';

import { LengthDetailsPage } from './length-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LengthDetailsPageRoutingModule
  ],
  declarations: [LengthDetailsPage]
})
export class LengthDetailsPageModule {}
