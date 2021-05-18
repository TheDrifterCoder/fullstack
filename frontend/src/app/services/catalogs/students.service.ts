import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { BackendRouteService } from '../../config/backend-route.service';
import { filter } from 'rxjs/operators';

const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private url: any;

  constructor(private uriBack: BackendRouteService, private http: HttpClient) {
    this.url = this.uriBack.backendURI();    
  }

  studentsAll(){
    return this.http.get(this.url + '/students');
  }

  search(filter: string){
    return this.http.get(this.url + "/students/filter/" + filter);
  }

  logIn(form: any): Observable<any>{
    return this.http.post(this.url + '/login', form.value);
    //return result;
  }

  logout(token: any): Observable<any>{
    return this.http.post(this.url + '/logout', {'token': token});
    //return result;
  }

  deleteAll(data: any): Observable<any>{
    return this.http.post<any>(this.url + '/students/delete', data);
  }
}
