import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedersPage } from './feeders.page';

const routes: Routes = [
  {
    path: '',
    component: FeedersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedersPageRoutingModule {}
