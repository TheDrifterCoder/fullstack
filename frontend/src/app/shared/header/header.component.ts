import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    // this.logout();
  }

  logout() {
    let token = localStorage.getItem('auth_token');
    // this.auth.logout(token).subscribe(
    //   (resp) => {
    //     localStorage.clear();
    //     this.router.navigate(['/home/login']);
    //   },
    //   (error) => {
    //     this.router.navigate(['/home/login']);
    //   }
    // );

    this.auth.logout(token);
    // this.router.navigate(['/login'], {queryParams: { loggedOut: 'success'}});
  }

  log() {
    this.router.navigate(['/']);
  }

}
