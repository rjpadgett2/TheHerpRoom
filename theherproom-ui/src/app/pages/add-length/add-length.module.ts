import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLengthPageRoutingModule } from './add-length-routing.module';

import { AddLengthPage } from './add-length.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLengthPageRoutingModule
  ],
  declarations: [AddLengthPage]
})
export class AddLengthPageModule {}
