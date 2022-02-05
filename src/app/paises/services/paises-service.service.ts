import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisesServiceService {

  private _baseUrl: string = 'https://restcountries.com/v3.1'

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

  constructor(private http: HttpClient) {}

  //lea la region y traer los datos
  getPaisesPorRegion(region: string): Observable<PaisSmall[]>{
    const url : string = `${this._baseUrl}/region/${region}?fields=cioc,name`
    return this.http.get<PaisSmall[]>(url);
  }


}
