import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFeederPageRoutingModule } from './add-feeder-routing.module';

import { AddFeederPage } from './add-feeder.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddFeederPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AddFeederPage]
})
export class AddFeederPageModule {}
