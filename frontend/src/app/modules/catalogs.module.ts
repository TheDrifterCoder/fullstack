import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CatalogsRoutingModule } from './catalogs-routing.module';
import { AuthService } from '../auth/auth.service';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// components
import { StudentsComponent } from '../pages/catalogs/students/students.component';
import { UsersComponent } from '../pages/catalogs/users/users.component';
import { StudentsInsertComponent } from '../pages/catalogs/students/students-insert/students-insert.component';

// materials
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select'; 

@NgModule({
  declarations: [
    StudentsComponent,
    UsersComponent,
    StudentsInsertComponent
  ],
  imports: [
    BrowserModule,
    CatalogsRoutingModule,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSortModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule, MatDialogModule
  ],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CatalogsModule { }
