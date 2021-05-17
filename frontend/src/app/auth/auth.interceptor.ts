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
    // request = this.setHeaders(request);
    // return next.handle(request);
    // .pipe(
    //   catchError((error: any) => {
    //     if (error instanceof HttpErrorResponse){
    //       switch (error.status) {
    //         case 0:
    //           return throwError ({status: error.status, message: "No se pudo conectar al servidor, contacte con el administrador."} as AppResponse);

    //         default:
    //           return throwError ({status: error.status, message: error.message} as AppResponse);
    //       }
    //     } else if(error.error instanceof ErrorEvent) {
    //       return throwError({status: error.status, message: error.error.message} as AppResponse);
    //     } else {
    //       return throwError({status: error.status, message: error.error.message} as AppResponse);
    //     }
    //   }),
    //   finalize(() => {
    //     console.log("Conexión autorizada");
    //   })
    // );
  }
}
