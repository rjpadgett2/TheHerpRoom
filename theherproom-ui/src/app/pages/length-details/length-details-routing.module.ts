import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LengthDetailsPage } from './length-details.page';

const routes: Routes = [
  {
    path: '',
    component: LengthDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LengthDetailsPageRoutingModule {}
