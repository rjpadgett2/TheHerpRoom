import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLengthPage } from './add-length.page';

const routes: Routes = [
  {
    path: '',
    component: AddLengthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLengthPageRoutingModule {}
