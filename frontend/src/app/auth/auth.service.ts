import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendRouteService } from '../config/backend-route.service';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// datos del token
class DecodedToken {
  exp!: number; //expiracion
  username!: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: any;
  private decodedToken: any;
  private islogged: boolean;

  constructor(private uriBack: BackendRouteService, private http: HttpClient) {
    this.url = this.uriBack.backendURI();    
    this.islogged = false;
  }

  // public get isLoggedIn() { return !!sessionStorage.getItem('auth_token'); }  
  public get getToken() { return sessionStorage.getItem('auth_token'); }
  public get getRefreshToken() { return sessionStorage.getItem('refresh'); }

  isLoggedIn(): boolean {
    return this.islogged;
  }

  public register(userData: any): Observable<any>{
    var route = this.url + "/register";
    return this.http.post(route, userData);
  }

  public login(userData: any): Observable<any> {
     var route = this.url + "/login";
     return this.http.post(route, userData).pipe(map(token => {
      return this.saveToken(token);
     }));
  }

  private saveToken(token: any): any {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(token.data.name));
    return token;
  }

  // public logout(userData: any): Observable<any> {
  //   var route = this.url + "/logout";

  //   this.route.post(route, {'token': token}).subscribe(
  //     data => {
  //        console.log("exit");
  //     }
  //   );

  //   return this.http.get(route).pipe(map(token => {
  //     localStorage.removeItem('auth_token');
  //     localStorage.removeItem('auth_user');

  //     this.decodedToken = new DecodedToken();
  //   }));
  // }

  public logout(token: any) {
    
    var route = this.url + "/logout";
    // return this.http.post(route, {'token': token});



      return this.http.post<any>(route, {'auth_token': token}).toPromise()
      .then(res => <any>res)
      .then(data => {return data;});


    // this.route.post(route, {'token': token}).subscribe(
    //   data => {
    //      console.log("exit");
    //   }
    // );

    // return this.http.get(route).pipe(map(token => {
    //   localStorage.removeItem('auth_token');
    //   localStorage.removeItem('auth_user');

    //   this.decodedToken = new DecodedToken();
    // }));
  }

  public isAuthenticated(): boolean {
     var data = localStorage.getItem('auth_token');
     if(data != undefined && data != '' && data != null){
       this.islogged = true;
       return true
     }

     this.islogged = false;
     return false;
  }

  public getUserLogged(): string {
     return localStorage.getItem('auth_user') || '';
  }
}
