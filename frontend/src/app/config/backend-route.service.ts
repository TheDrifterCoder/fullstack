import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendRouteService {

  private urlAPI = 'route here';
  constructor() { }

  backendURI(){
    return this.urlAPI;
  }

}
