import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'add-herps',
    loadChildren: () => import('./pages/add-herps/add-herps.module').then( m => m.AddHerpsPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'add-feeder',
    loadChildren: () => import('./pages/herps/herp-details/feeders/add-feeder/add-feeder.module').then(m => m.AddFeederPageModule)
  },
  {
    path: 'feeder-details',
    loadChildren: () => import('./pages/herps/herp-details/feeders/feeder-details/feeder-details.module').then(m => m.FeederDetailsPageModule)
  },
  {
    path: 'length-details',
    loadChildren: () => import('./pages/length-details/length-details.module').then( m => m.LengthDetailsPageModule)
  },
  {
    path: 'weight-details',
    loadChildren: () => import('./pages/weight-details/weight-details.module').then( m => m.WeightDetailsPageModule)
  },
  {
    path: 'add-length',
    loadChildren: () => import('./pages/add-length/add-length.module').then( m => m.AddLengthPageModule)
  },
  {
    path: 'add-weight',
    loadChildren: () => import('./pages/add-weight/add-weight.module').then( m => m.AddWeightPageModule)
  },
  {
    path: 'feeders',
    loadChildren: () => import('./pages/herps/herp-details/feeders/feeders.module').then(m => m.FeedersPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./pages/password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
