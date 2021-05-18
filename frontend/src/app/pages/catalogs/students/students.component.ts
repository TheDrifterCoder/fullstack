import { AfterViewInit, ViewChild, Component, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GlobalsService } from 'src/app/config/globals.service';
import { StudentsService } from 'src/app/services/catalogs/students.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Students } from '../../../interfaces/catalogs/students';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'patern_surname', 'matern_surname', 'birth_date', 'gender', 'academic_level', 'email', 'phone'];
  // dataSource = ELEMENT_DATA;
  students = [];
  selection = new SelectionModel<Students>(false, []);
  // displayedColumns: string[] = ['position', 'name', 'patern_surname', 'matern_surname', 'birth_date', 'gender', 'academic_level', 'email', 'phone'];
  dataSource = new MatTableDataSource<Students>([]);
  public dataResponse: any;
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  nPages = this.globals.paginator;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(public globals: GlobalsService, private studentService: StudentsService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.studentService.studentsAll().subscribe(
      data => {
        this.dataResponse = data;
        this.dataSource.data = this.dataResponse.data;
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Students): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}