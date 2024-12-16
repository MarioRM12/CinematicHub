import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pelicula } from "../interface/peliculas.interfaces";

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private BasicAPIUrl = 'http://localhost:8080/peliculas';
  private BasicTMDBUrl = 'http://localhost:8080/api/tmdb';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllPeliculas(): Observable<Pelicula[]> {
    const url = `${this.BasicAPIUrl}/all`; // Endpoint para obtener todas las películas
    return this.http.get<Pelicula[]>(url, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getPelicula(id: number): Observable<Pelicula> {
    const url = `${this.BasicAPIUrl}/${id}`;
    return this.http.get<Pelicula>(url, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  addPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.BasicAPIUrl, pelicula, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updatePelicula(pelicula: Pelicula): Observable<Pelicula> {
    const url = `${this.BasicAPIUrl}/${pelicula.idPelicula}`;
    return this.http.put<Pelicula>(url, pelicula, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deletePelicula(id: number): Observable<void> {
    const url = `${this.BasicAPIUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error en el servicio PeliculaService: ', error);
    return throwError(() => new Error('Ocurrió un problema al procesar tu solicitud.'));
  }

  getPopularMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.BasicTMDBUrl + '/popular-movies');
  }

  getUpcomingMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.BasicTMDBUrl + '/upcoming-movies');
  }
}
