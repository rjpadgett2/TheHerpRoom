import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPage } from './landing.page';
import {AuthGuard} from "../../shared/guards/auth-guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: LandingPage,
    children: [
      {
        path: 'herps',
        canLoad: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('../herps/herps.module').then( m => m.HerpsPageModule)
          },
          {
            path: ':herpId',
            loadChildren: () => import('../herps/herp-details/herp-details.module').then( m => m.HerpDetailsPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
