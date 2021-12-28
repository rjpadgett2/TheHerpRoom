import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HerpDetailsPage } from './herp-details.page';

const routes: Routes = [
  {
    path: '',
    component: HerpDetailsPage
  },
  {
    path: 'feeders',
    loadChildren: () => import('./feeders/feeders.module').then(m => m.FeedersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerpDetailsPageRoutingModule {}
