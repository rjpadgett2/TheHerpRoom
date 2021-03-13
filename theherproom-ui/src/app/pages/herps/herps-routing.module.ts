 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HerpsPage } from './herps.page';

const routes: Routes = [
  {
    path: '',
    component: HerpsPage
  },
  {
    path: 'herp-details',
    loadChildren: () => import('./herp-details/herp-details.module').then(m => m.HerpDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerpsPageRoutingModule {}
