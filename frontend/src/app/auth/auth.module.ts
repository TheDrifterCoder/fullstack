import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// del auth
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
// import { AuthGuard } from './auth.guard';

// Materials
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
  ],
  providers: [AuthService, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
  })
export class AuthModule { }
