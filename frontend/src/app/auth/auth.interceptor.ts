import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppResponse } from './AppResponse';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // private setHeaders(request: HttpRequest<any>) {
  //   const token = this.authService.getToken;
  //   let headers = null;

  //   if (token) {
  //     headers = new HttpHeaders({
  //       'Content-Type': 'application/form-data; application/json',
  //       'Authorization': `Bearer ${token}`,
  //     });
  //   } else {
  //     headers = new HttpHeaders({
  //       'content-type': 'application/json',
  //     });
  //   }

  //   return request;
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    let headers = null;

    if(token){
      headers = new HttpHeaders({
        'Content-Type' : 'application/form-data; application/json',
        'Authorization' : `Bearer ${token}`,
      });
    }else{
      headers = new HttpHeaders({
        'content-type': 'application/json', 
    });
    }
    const requestChange = request.clone({headers});
    console.log(requestChange);
    return next.handle(requestChange);    
  }
}
