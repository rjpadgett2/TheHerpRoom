import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightDetailsPageRoutingModule } from './weight-details-routing.module';

import { WeightDetailsPage } from './weight-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightDetailsPageRoutingModule
  ],
  declarations: [WeightDetailsPage]
})
export class WeightDetailsPageModule {}
