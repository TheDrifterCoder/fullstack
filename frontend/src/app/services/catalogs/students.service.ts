import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { BackendRouteService } from '../../config/backend-route.service';

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
}
