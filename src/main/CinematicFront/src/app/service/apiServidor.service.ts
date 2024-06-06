import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Pelicula} from "../interface/peliculas.interfaces";
import {Serie} from "../interface/series.interfaces";
import {Lista} from "../interface/lista.interfaces";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
const URLHOST = "http://localhost:8080/"
const URLPELICULAS = URLHOST + "peliculas";
const URLSERIES = URLHOST + "series";
const URLLISTAS = URLHOST + "listas";

@Injectable({
  providedIn: 'root'
})
export class ApilistasService {

  constructor(private http:HttpClient) {
  }

  getPeliculas():Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>(URLPELICULAS);
  }

  getSeries():Observable<Serie[]>{
    return this.http.get<Serie[]>(URLSERIES);
  }

  getListas():Observable<Lista[]>{
    return this.http.get<Lista[]>(URLLISTAS);
  }

}
