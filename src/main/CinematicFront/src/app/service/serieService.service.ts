import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Serie } from "../interface/series.interfaces";

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private BasicAPIUrl = 'http://localhost:8080/series';
  private BasicTMDBUrl = 'http://localhost:8080/api/tmdb';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllSeries(): Observable<Serie[]> {
    const url = `${this.BasicAPIUrl}/all`; // Endpoint para obtener todas las series
    return this.http.get<Serie[]>(url, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getSerie(id: number): Observable<Serie> {
    const url = `${this.BasicAPIUrl}/${id}`;
    return this.http.get<Serie>(url, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  addSerie(serie: Serie): Observable<Serie> {
    return this.http.post<Serie>(this.BasicAPIUrl, serie, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateSerie(serie: Serie): Observable<Serie> {
    const url = `${this.BasicAPIUrl}/${serie.idSerie}`;
    return this.http.put<Serie>(url, serie, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteSerie(id: number): Observable<void> {
    const url = `${this.BasicAPIUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error en el servicio SerieService: ', error);
    return throwError(() => new Error('Ocurrió un problema al procesar tu solicitud.'));
  }

  getTodayTVSeries() {
    return this.http.get<any[]>(this.BasicTMDBUrl + '/Today-TVSeries');
  }
}
