import { AfterViewInit, ViewChild, Component, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GlobalsService } from 'src/app/config/globals.service';
import { StudentsService } from 'src/app/services/catalogs/students.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Students } from '../../../interfaces/catalogs/students';

import { ConfirmDialogModel, ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'patern_surname', 'matern_surname', 'birth_date', 'gender', 'academic_level', 'email', 'phone'];

  students = [];
  selected = [];
  selection = new SelectionModel<Students>(false, []);
  dataSource = new MatTableDataSource<Students>([]);
  public dataResponse: any;
  nPages = this.globals.paginator;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  result: string = '';

  constructor(public globals: GlobalsService, private studentService: StudentsService, public dialog: MatDialog) { }

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

  delete(){
    var array = this.selection.selected;
    var toDelete = array.map(function(array) {
      return array.id;
    });

    // createCustomAlert(this.globals.deleteMessage);

    
  }

  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }

  add(){

  }
}