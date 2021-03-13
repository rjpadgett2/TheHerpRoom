import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HerpDetailsPage } from './herp-details.page';

const routes: Routes = [
  {
    path: '',
    component: HerpDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerpDetailsPageRoutingModule {}
