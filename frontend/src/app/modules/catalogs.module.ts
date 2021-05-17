import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from '../pages/catalogs/students/students.component';
import { UsersComponent } from '../pages/catalogs/users/users.component';
import { CatalogsRoutingModule } from './catalogs-routing.module';
import { AuthService } from '../auth/auth.service';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// materiales
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    StudentsComponent,
    UsersComponent
  ],
  imports: [
    CatalogsRoutingModule,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CatalogsModule { }
