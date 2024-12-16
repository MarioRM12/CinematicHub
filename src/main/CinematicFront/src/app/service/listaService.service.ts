import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lista } from "../interface/lista.interfaces";
import {Pelicula} from "../interface/peliculas.interfaces";

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private BasicAPIUrl = 'http://localhost:8080/listas'; // Cambia esta URL a la de tu API

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllListas(): Observable<Lista[]> {
    const url = `${this.BasicAPIUrl}/all`; // Endpoint para obtener todas las listas
    return this.http.get<Lista[]>(url, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getLista(id: number): Observable<Lista> {
    const url = `${this.BasicAPIUrl}/${id}`;
    return this.http.get<Lista>(url, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  addLista(lista: Lista): Observable<Lista> {
    return this.http.post<Lista>(this.BasicAPIUrl, lista, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateLista(lista: Lista): Observable<Lista> {
    const url = `${this.BasicAPIUrl}/${lista.idLista}`;
    return this.http.put<Lista>(url, lista, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteLista(id: number): Observable<void> {
    const url = `${this.BasicAPIUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error en el servicio ListaService: ', error);
    return throwError(() => new Error('Ocurrió un problema al procesar tu solicitud.'));
  }

  verificaOCreaPeliculaYAgrega(pelicula: Pelicula, idLista: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(
      `http://localhost:8080/listas/${idLista}/verifica-o-crea`,
      pelicula,
      { headers }
    )
  }

  eliminarPeliculaDeLista(idLista: number, idPelicula: number): Observable<void> {
    const url = `${this.BasicAPIUrl}/${idLista}/peliculas/${idPelicula}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

}
