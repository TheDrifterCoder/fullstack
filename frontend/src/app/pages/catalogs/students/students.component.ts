import { AfterViewInit, ViewChild, Component, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalsService } from 'src/app/config/globals.service';
import { StudentsService } from 'src/app/services/catalogs/students.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements AfterViewInit  {
  displayedColumns: string[] = ['position', 'name', 'patern_surname', 'matern_surname', 'birth_date', 'gender', 'academic_level', 'email', 'phone'];
  dataSource = new MatTableDataSource<any>([]);
  public dataResponse: any;
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  nPages = this.globals.paginator;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public globals: GlobalsService, private studentService: StudentsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStudents();
  }

  openDialog() {
    const dialogRef = this.dialog.open(insertStudent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getStudents(){
    this.studentService.studentsAll().subscribe(
      data => {
        this.dataResponse = data;
        this.dataSource.data = this.dataResponse.data;
      }
    );
  }

}



// html para insertar estudiantes
@Component({
  selector: 'student-insert',
  templateUrl: 'studentsInsert.component.html',
})
export class insertStudent {
  constructor(
    public dialogRef: MatDialogRef<insertStudent>,
    @Inject(MAT_DIALOG_DATA) public data: '') {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
