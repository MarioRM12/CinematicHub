import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from "../interface/peliculas.interfaces";

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private apiUrl = 'http://localhost:8080/peliculas';  // Cambia esta URL a la de tu API

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  getPelicula(id: number): Observable<Pelicula> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Pelicula>(url);
  }

  addPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updatePelicula(pelicula: Pelicula): Observable<Pelicula> {
    const url = `${this.apiUrl}/${pelicula.idPelicula}`;
    return this.http.put<Pelicula>(url, pelicula, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deletePelicula(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
