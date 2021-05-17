import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { CatalogsModule } from './modules/catalogs.module';
import { FeatureComponent } from './shared/feature/feature.component';
 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FeatureComponent,
  ],
  imports: [
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    BrowserModule,
    AppRoutingModule,
    CatalogsModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
