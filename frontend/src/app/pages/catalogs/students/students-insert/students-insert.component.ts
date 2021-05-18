import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from 'src/app/services/catalogs/students.service';
import { Genders } from 'src/app/interfaces/catalogs/genders';

@Component({
  selector: 'app-students-insert',
  templateUrl: './students-insert.component.html',
  styleUrls: ['./students-insert.component.scss']
})
export class StudentsInsertComponent implements OnInit {
  genders: Genders[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Femenino', viewValue: 'Femenino'},
  ];
  academic_levels = [
    {value: '1', viewValue: 'Primaria primer grado'},
    {value: '2', viewValue: 'Secundaria primer grado'},
  ];

  title: string;
  message: string;
  insertStudentForm!: FormGroup;
  errors: any = [];
  showNotify: boolean = false;
  notify: String = "";
  selectedGender!: string;
  selectedAcademicLevel!: string;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  constructor(public dialogRef: MatDialogRef<StudentsInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmStudentInsert, private studentService: StudentsService, 
    private fb: FormBuilder) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
    this.initForm();
  }

  onReset() {
    this.insertStudentForm.reset();
    this.initForm();
  }

  initForm(){
    this.insertStudentForm = this.fb.group({
      name: [null, [Validators.required]],
      patern_surname: [null, [Validators.required]],
      matern_surname: [null, [Validators.required]],
      birth_date: [null, [Validators.required]],
      gender: [null],
      academic_level_id: [null],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

  isValidInput(fieldName: any): boolean {
    return this.insertStudentForm.controls[fieldName].invalid &&
      (this.insertStudentForm.controls[fieldName].dirty || this.insertStudentForm.controls[fieldName].touched);
  }

  insert(){
    console.log(this.insertStudentForm);
    this.studentService.storeStudent(this.insertStudentForm).subscribe(
      (response) => { 
        this.showNotify = true;
        this.notify = response.message;
        setTimeout(()=>{ 
          this.showNotify = false;
          this.notify = "";
        }, 4000)

        this.onReset();
      },
      (error) => { 
        let errs = (error.error.data);
        this.errors = Object.values(errs);

        setTimeout(()=>{ this.errors = [] }, 4000)
      }
    );
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class ConfirmStudentInsert {
  constructor(public title: string, public message: string) {
  }
}