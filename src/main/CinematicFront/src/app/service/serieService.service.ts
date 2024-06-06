import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from "../interface/series.interfaces";

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private apiUrl = 'http://localhost:8080/series';  // Cambia esta URL a la de tu API

  constructor(private http: HttpClient) {}

  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.apiUrl);
  }

  getSerie(id: number): Observable<Serie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Serie>(url);
  }

  addSerie(serie: Serie): Observable<Serie> {
    return this.http.post<Serie>(this.apiUrl, serie, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateSerie(serie: Serie): Observable<Serie> {
    const url = `${this.apiUrl}/${serie.idSerie}`;
    return this.http.put<Serie>(url, serie, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteSerie(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
