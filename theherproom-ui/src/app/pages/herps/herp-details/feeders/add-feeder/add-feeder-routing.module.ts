import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFeederPage } from './add-feeder.page';

const routes: Routes = [
  {
    path: '',
    component: AddFeederPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFeederPageRoutingModule {}
