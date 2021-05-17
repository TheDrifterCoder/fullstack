import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  paginator = [10, 20, 100, 1000];
  constructor() { }
}
