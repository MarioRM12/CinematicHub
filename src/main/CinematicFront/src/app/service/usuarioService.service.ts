import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../interface/usuario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/usuarios'; // URL to web API

  constructor(private http: HttpClient) { }

  /**
   * Método para crear headers con autenticación
   */
  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /** GET: fetch all usuarios from the server */
  allWithParams(buscar?: string, ordenar?: string, page: number = 0, size: number = 10): Observable<Usuario[]> {
    let params: any = {
      page: page.toString(),
      size: size.toString()
    };
    if (buscar) {
      params['buscar'] = buscar;
    }
    if (ordenar) {
      params['ordenar'] = ordenar;
    }
    const headers = this.createAuthHeaders();
    return this.http.get<Usuario[]>(this.apiUrl, { headers, params })
      .pipe(catchError(this.handleError<Usuario[]>('allWithParams', [])));
  }

  all(): Observable<Usuario[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Usuario[]>(`${this.apiUrl}/all`, { headers })
      .pipe(catchError(this.handleError<Usuario[]>('all', [])));
  }

  /** GET: fetch a single usuario by id */
  one(id: number): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    const headers = this.createAuthHeaders();
    return this.http.get<Usuario>(url, { headers })
      .pipe(catchError(this.handleError<Usuario>(`one id=${id}`)));
  }

  /** POST: add a new usuario to the server */
  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/registrar`;
    const headers = this.createAuthHeaders();
    return this.http.post<Usuario>(url, usuario, { headers })
      .pipe(catchError(this.handleError<Usuario>('registrarUsuario')));
  }

  /** PUT: update the usuario on the server */
  replace(id: number, partialData: Partial<Usuario>): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const headers = this.createAuthHeaders();
    return this.http.put(url, partialData, { headers })
      .pipe(catchError(this.handleError<any>('updatePartial')));
  }

  /** DELETE: delete the usuario from the server */
  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const headers = this.createAuthHeaders();
    return this.http.delete(url, { headers })
      .pipe(catchError(this.handleError<any>('deleteUsuario')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** GET: fetch a single usuario by username */
  oneByUsername(username: string): Observable<Usuario> {
    const url = `${this.apiUrl}/by-username/${username}`; // Ajusta la URL acorde al endpoint en tu backend
    const headers = this.createAuthHeaders();
    return this.http.get<Usuario>(url, { headers })
      .pipe(catchError(this.handleError<Usuario>(`oneByUsername username=${username}`)));
  }
}
