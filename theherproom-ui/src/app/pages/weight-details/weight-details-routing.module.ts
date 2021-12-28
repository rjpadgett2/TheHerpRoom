import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeightDetailsPage } from './weight-details.page';

const routes: Routes = [
  {
    path: '',
    component: WeightDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeightDetailsPageRoutingModule {}
