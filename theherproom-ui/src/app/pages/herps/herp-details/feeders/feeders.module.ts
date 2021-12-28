import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedersPageRoutingModule } from './feeders-routing.module';

import { FeedersPage } from './feeders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedersPageRoutingModule
  ],
  declarations: [FeedersPage]
})
export class FeedersPageModule {}
