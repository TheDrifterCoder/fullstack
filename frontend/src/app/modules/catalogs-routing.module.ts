import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from '../pages/catalogs/students/students.component';
import { UsersComponent } from '../pages/catalogs/users/users.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {path: 'students', component: StudentsComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class CatalogsRoutingModule { }
