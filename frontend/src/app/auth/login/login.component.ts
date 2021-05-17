import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errors: any = [];
  notify!: string;
  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();    
  }

  initForm(){
    this.loginForm = this.fb.group({
      login_user: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  isValidInput(fieldName: any): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  login(){
    console.log(this.loginForm);
    this.auth.logIn(this.loginForm).subscribe(
      (response) => { 
        console.log(response.data.token);
        localStorage.removeItem('token');
        localStorage.setItem('token', response.data.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => { 
        localStorage.removeItem('token');
        // this.errors = error.error.data;
        alert(error.error.data.error);

      }
    );
  }

}
