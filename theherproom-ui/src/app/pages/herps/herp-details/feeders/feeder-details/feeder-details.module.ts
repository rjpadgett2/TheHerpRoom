import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeederDetailsPageRoutingModule } from './feeder-details-routing.module';

import { FeederDetailsPage } from './feeder-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeederDetailsPageRoutingModule
  ],
  declarations: [FeederDetailsPage]
})
export class FeederDetailsPageModule {}
