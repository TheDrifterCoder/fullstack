import { AfterViewInit, ViewChild, Component, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalsService } from 'src/app/config/globals.service';
import { StudentsService } from 'src/app/services/catalogs/students.service';

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

  constructor(public globals: GlobalsService, private studentService: StudentsService) { }

  ngOnInit(): void {
    this.getStudents();
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