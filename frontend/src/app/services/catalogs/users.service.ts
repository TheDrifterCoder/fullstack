import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { BackendRouteService } from '../../config/backend-route.service';
import { filter } from 'rxjs/operators';

const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: any;
  public academic_levels = [];

  constructor(private uriBack: BackendRouteService, private http: HttpClient) {
    this.url = this.uriBack.backendURI();    
  }

  usersAll(){
    return this.http.get(this.url + '/users');
  }

  search(filter: string){
    return this.http.get(this.url + "/users/filter/" + filter);
  }
}
