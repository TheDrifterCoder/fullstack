import { AfterViewInit, ViewChild, Component, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalsService } from 'src/app/config/globals.service';
import { StudentsService } from 'src/app/services/catalogs/students.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements AfterViewInit  {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  // displayedColumns: string[] = ['position', 'name', 'patern_surname', 'matern_surname', 'birth_date', 'gender', 'academic_level', 'email', 'phone'];
  dataSource = new MatTableDataSource<any>([]);
  public dataResponse: any;
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  nPages = this.globals.paginator;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(public globals: GlobalsService, private studentService: StudentsService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){
    this.studentService.studentsAll().subscribe(
      data => {
        this.dataResponse = data;
        console.log(this.dataResponse);
        this.dataSource = this.dataResponse.data;
      }
    );
  }

}