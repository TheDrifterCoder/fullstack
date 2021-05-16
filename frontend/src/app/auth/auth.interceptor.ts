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
import { AuthService } from './auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { AppResponse } from './AppResponse';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  private setHeaders(request: HttpRequest<any>){    
    // const token = this.authService.getToken;
    // let headers = null;

    // if(token){
    //   headers = new HttpHeaders({
    //     'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8, application/json',
    //     'Authorization' : `Bearer ${token}`,
    //   });
    // }else{
    //   headers = new HttpHeaders({
    //     'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8, application/json'
    // });
    // }
    // const requestChange = request.clone({headers});
    // // console.log(requestChange);
    // return next.handle(requestChange);


    const token = this.authService.getToken;
    if (token) {
        request = request.clone({
            setHeaders: {
                'content-type': 'application/json', 
                 Authorization: token
            }
         });
    }
    return request;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.setHeaders(request);
    return next.handle(request);
    // .pipe(
    //   catchError((error: any) => {
    //     if (error instanceof HttpErrorResponse){
    //       switch (error.status) {
    //         case 0:
    //           return throwError ({status: error.status, message: "No se pudo conectar al servidor, contacte con el administrador."} as AppResponse);
            
    //         default:
    //           return throwError ({status: error.status, message: error.message} as AppResponse);
    //       }
    //     // } else if(error.error instanceof ErrorEvent) {
    //     //   return throwError({status: error.status, message: error.error.message} as AppResponse);
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
