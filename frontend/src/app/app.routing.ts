import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },{
    path: '',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]
