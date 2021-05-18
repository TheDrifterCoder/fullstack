import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmStudentInsert, StudentsInsertComponent } from '../catalogs/students/students-insert/students-insert.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  result: string = '';
  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  add(){
    const message = `Ingresa los datos requeridos para el registro de un nuevo estudiante.`;
    const dialogData = new ConfirmStudentInsert("Registrar nuevo estudiante.", message);
    const dialogRef = this.dialog.open(StudentsInsertComponent, {
      maxWidth: "800px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
}

}
