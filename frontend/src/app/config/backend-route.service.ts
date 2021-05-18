import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendRouteService {

  private urlAPI = 'http://localhost/[aqui va la ruta del backend]/public/api';
  constructor() { }

  backendURI(){
    return this.urlAPI;
  }

}
