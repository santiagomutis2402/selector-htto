import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private _baseurl="https://restcountries.com/v3.1"
  private _regiones:string[]=['Africa','America','Asia','Europe','Australia'];

  get regiones():string[]{
    return [...this._regiones];
  }

  constructor(private http:HttpClient) { }

  getpaisesPorRegion(region:string):Observable<PaisSmall[]>{
    const url:string=`${this._baseurl}/subregion/${region}?fields=name,capital,cca3`
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo(codigo:string):Observable<Pais[] >{
    if(!codigo){
      return of()
    }
    const url:string=`${this._baseurl}/alpha/?codes=${codigo}#`
    return this.http.get<Pais[]>(url);
  }

  getPaisPorCodigoSmall(codigo:string):Observable<Pais | null>{
    const url:string=`${this._baseurl}/alpha/?codes=${codigo}#?fields=name,capital,cca3`
    return this.http.get<Pais>(url);
  }
}
