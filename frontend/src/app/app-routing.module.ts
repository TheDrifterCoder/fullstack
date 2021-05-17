import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';

// import { AuthGuard } from './auth/auth.guard';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [ AuthGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
