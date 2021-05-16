import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendRouteService {

  private urlAPI = 'http://localhost/test-fullstack/backend/public/api';
  constructor() { }

  backendURI(){
    return this.urlAPI;
  }

}
