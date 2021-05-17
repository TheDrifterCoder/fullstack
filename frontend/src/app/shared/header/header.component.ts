import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isloggedIn: boolean;
  constructor(public auth: AuthService, private router: Router) { 
    this.isloggedIn = this.auth.loggedIn;
  }

  ngOnInit() {
  }

  logout(){
    let token = localStorage.getItem('token');
    this.auth.logout(token).subscribe(
      (resp) => {
        localStorage.clear();
        this.auth.loggedIn = false;
        this.router.navigate(['/login']);
      },
      (error) =>{
        this.router.navigate(['/login'])
      }
    );
  }
}
