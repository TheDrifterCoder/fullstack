import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from 'src/app/services/catalogs/students.service';
import { Genders } from 'src/app/interfaces/catalogs/genders';
import { GlobalsService } from 'src/app/config/globals.service';

@Component({
  selector: 'app-students-update',
  templateUrl: './students-update.component.html',
  styleUrls: ['./students-update.component.scss']
})
export class StudentsUpdateComponent implements OnInit {
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
  updateStudentForm!: FormGroup;
  errors: any = [];
  showNotify: boolean = false;
  notify: String = "";
  selectedGender!: string;
  selectedAcademicLevel!: string;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  dataTemp: any = this.globals.tempData;

  constructor(public dialogRef: MatDialogRef<StudentsUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmStudentUpdate, private studentService: StudentsService, 
    private fb: FormBuilder, public globals: GlobalsService) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
    this.initForm();
  }

  onReset() {
    this.updateStudentForm.reset();
  }


  initForm(){    
    this.updateStudentForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      patern_surname: [null, [Validators.required]],
      matern_surname: [null, [Validators.required]],
      birth_date: [null, [Validators.required]],
      gender: [null],
      academic_level_id: [null],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      created_at: [null]
    });

    this.updateStudentForm.patchValue({
      id: this.dataTemp.id,
      name: this.dataTemp.name,
      patern_surname: this.dataTemp.patern_surname,
      matern_surname: this.dataTemp.matern_surname,
      birth_date: this.dataTemp.birth_date,
      gender: this.dataTemp.gender,
      academic_level_id: this.dataTemp.academic_level_id,
      email: this.dataTemp.email,
      phone: this.dataTemp.phone,
   });    
  }

  isValidInput(fieldName: any): boolean {
    return this.updateStudentForm.controls[fieldName].invalid &&
      (this.updateStudentForm.controls[fieldName].dirty || this.updateStudentForm.controls[fieldName].touched);
  }

  update(){
    console.log(this.updateStudentForm);
    this.studentService.updateStudent(this.updateStudentForm).subscribe(
      (response) => { 
        this.showNotify = true;
        this.notify = response.message;
        this.onReset();

        setTimeout(()=>{ 
          this.showNotify = false;
          this.notify = "";          
          this.onDismiss();
        }, 2000)
      },
      (error) => { 
        let errs = (error.error.data);
        this.errors = Object.values(errs);

        setTimeout(()=>{ this.errors = [] }, 6000)
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


// Esta parte sepuede modular
export class ConfirmStudentUpdate {
  constructor(public title: string, public message: string) {
  }
}