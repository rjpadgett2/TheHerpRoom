import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HerpDetailsPageRoutingModule } from './herp-details-routing.module';

import { HerpDetailsPage } from './herp-details.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HerpDetailsPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [HerpDetailsPage]
})
export class HerpDetailsPageModule {}
