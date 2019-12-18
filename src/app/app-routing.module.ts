import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    // path : '',
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    // path : '',
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: '**',
    redirectTo: 'home'
    //redirectTo: 'dashboard',
    //pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
