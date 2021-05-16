import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UsersComponent } from './pages/catalogs/users/users.component';
import { StudentsComponent } from './pages/catalogs/students/students.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CatalogsCrudHeaderComponent } from './shared/catalogs-crud-header/catalogs-crud-header.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { BlockDisplayComponent } from './shared/block-display/block-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    StudentsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CatalogsCrudHeaderComponent,
    PaginationComponent,
    BlockDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
