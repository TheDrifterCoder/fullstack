import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
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
  private islogged: boolean = false;

  constructor(private uriBack: BackendRouteService, private http: HttpClient) {
    this.url = this.uriBack.backendURI();    
  }

  loggedIn = false;

  registerUser(form: any){
    console.log(form.value);
    return this.http.post('http://localhost/laravelAngularApi/public/api/register', form.value);
  }

   isAuthenticated(){
  	const promise = new Promise(
  		(resolve,reject) => {
  			setTimeout(() => {
          let t = localStorage.getItem('token');
          if(t){
            this.loggedIn = true;
            resolve(this.loggedIn);
          }else{
            this.loggedIn = false;
            reject();
          }
        },800);
  		});

  	return promise;
  }

  logIn(form: any): Observable<any>{
    return this.http.post(this.url + '/login', form.value);
    //return result;
  }

  logout(token: any): Observable<any>{
    return this.http.post(this.url + '/logout', {'token': token});
    //return result;
  }

  // public get isLoggedIn() { return !!sessionStorage.getItem('token'); }  
  // public get getToken() { return localStorage.getItem('token'); }
  // // public get getRefreshToken() { return localStorage.getItem('refresh'); }

  // isLoggedIn(): boolean {
  //   return this.islogged;
  // }

  // public register(userData: any): Observable<any>{
  //   var route = this.url + "/register";
  //   return this.http.post(route, userData);
  // }

  // public login(userData: any): Observable<any> {
  //    var route = this.url + "/login";
  //    return this.http.post(route, userData).pipe(map(response => {
  //     return this.saveToken(response);
  //    }));
  // }

  // private saveToken(token: any): any {
  //   localStorage.removeItem('token');
  //   localStorage.setItem('token', token.data.token);
  //   localStorage.setItem('auth_user', token.data.user);
  //   return token;    
  // }

  // logout(token: any): Observable<any>{
  //   return this.http.post(this.url + '/logout', {'token': token});
  // }

  // public isAuthenticated(){
  // 	const promise = new Promise(
  // 		(resolve,reject) => {
  // 			setTimeout(() => {
  //         let t = localStorage.getItem('token');
  //         if(t){
  //           this.islogged = true;
  //           resolve(this.islogged);
  //         }else{
  //           this.islogged = false;
  //           reject();
  //         }
  //       },800);
  // 		});

  // 	return promise;
  // }

  // public getUserLogged(): string {
  //    return localStorage.getItem('auth_user') || '';
  // }
}
