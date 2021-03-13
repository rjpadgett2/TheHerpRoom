import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HerpsPageRoutingModule } from './herps-routing.module';

import { HerpsPage } from './herps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HerpsPageRoutingModule
  ],
  declarations: [HerpsPage]
})
export class HerpsPageModule {}
