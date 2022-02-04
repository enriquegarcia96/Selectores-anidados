import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaisesServiceService {

  private _regiones: Array<string> = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): Array<string> {
    return [...this._regiones];
  }

  constructor() {}
}
