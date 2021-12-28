import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeederDetailsPage } from './feeder-details.page';

const routes: Routes = [
  {
    path: '',
    component: FeederDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeederDetailsPageRoutingModule {}
