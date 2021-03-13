import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddHerpsPage } from './add-herps.page';

const routes: Routes = [
  {
    path: '',
    component: AddHerpsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddHerpsPageRoutingModule {}
