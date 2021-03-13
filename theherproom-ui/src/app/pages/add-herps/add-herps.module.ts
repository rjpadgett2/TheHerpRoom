import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHerpsPageRoutingModule } from './add-herps-routing.module';

import { AddHerpsPage } from './add-herps.page';
import {IonicSelectableModule} from "ionic-selectable";
import {AppModule} from "../../app.module";
import { FormlyIonicModule } from '@ngx-formly/ionic';
import {FormlyModule} from "@ngx-formly/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddHerpsPageRoutingModule,
        IonicSelectableModule,
        AppModule,
        FormlyIonicModule,
        ReactiveFormsModule,
        FormlyModule
    ],
  declarations: [AddHerpsPage]
})
export class AddHerpsPageModule {}
