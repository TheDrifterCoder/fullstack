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

  title: string;
  message: string;
  insertStudentForm!: FormGroup;
  errors: any = [];
  notify!: string;

  constructor(public dialogRef: MatDialogRef<StudentsInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmStudentInsert, private studentService: StudentsService, 
    private fb: FormBuilder) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.insertStudentForm = this.fb.group({
      name: [null, [Validators.required]],
      patern_surname: [null, [Validators.required]],
      matern_surname: [null, [Validators.required]],
      birth_date: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      academic_level: [null, [Validators.required]],
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
    this.studentService.logIn(this.insertStudentForm).subscribe(
      (response) => { 
        console.log(response.data.token);
      },
      (error) => { 

      }
    );
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmStudentInsert {

  constructor(public title: string, public message: string) {
  }
}