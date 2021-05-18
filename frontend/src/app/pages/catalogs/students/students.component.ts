import { AfterViewInit, ViewChild, Component, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GlobalsService } from 'src/app/config/globals.service';
import { StudentsService } from 'src/app/services/catalogs/students.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Students } from '../../../interfaces/catalogs/students';

import { ConfirmDialogModel, ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ConfirmStudentInsert, StudentsInsertComponent } from './students-insert/students-insert.component';
import { ConfirmStudentUpdate, StudentsUpdateComponent } from './students-update/students-update.component';


import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'patern_surname', 'matern_surname', 'birth_date', 'gender', 'academic_level', 'email', 'phone'];
  search  = "";
  students = [];
  datatoDelete: any;
  selected = [];
  selection = new SelectionModel<Students>(false, []);
  dataSource = new MatTableDataSource<Students>([]);
  public dataResponse: any;
  nPages = this.globals.paginator;
  tempData: any = [];
  showNotify: boolean = false;
  notify: String = "";


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel = "Estudiantes por página";
        this.dataSource.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => { if (length == 0 || pageSize == 0) { return `0 of ${length}`; } length = Math.max(length, 0); const startIndex = page * pageSize; const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; return `${startIndex + 1} - ${endIndex} de ${length}`; }
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

    this.datatoDelete = toDelete;
    this.confirmDelete();
  }

  buscarDatos(){
    var filter = this.search;

    if(filter.trim() != ''){
      this.studentService.search(filter).subscribe(
        data => {
          this.dataResponse = data;
          this.dataSource.data = this.dataResponse.data;
        }
      )
    } else {
      this.getStudents();
    }
  }


  confirmDelete() {
    const message = `¿Está seguro de realizar la siguiente operación?`;
    const dialogData = new ConfirmDialogModel("¿Continuar?", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;

      if(this.result){
        this.studentService.deleteAll({data: this.datatoDelete}).subscribe(
          data => {

            this.showNotify = true;
            this.notify = data.message;

            setTimeout(()=>{ 
              this.showNotify = false;
              this.notify = "";          
              this.getStudents();
            }, 2000)
          }
        );
      }
    });
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
  
        if(this.result){
          this.getStudents();
        }
      });
  }

  goUpdate(data: any){
    this.globals.tempData = data;
    const message = `Ingresa los datos requeridos para el registro de un nuevo estudiante.`;
    const dialogData = new ConfirmStudentInsert("Actualizar datos del estudiante.", message);
    const dialogRef = this.dialog.open(StudentsUpdateComponent, {
      maxWidth: "800px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;

      if(this.result){
        this.getStudents();
      }
    });
  }
}