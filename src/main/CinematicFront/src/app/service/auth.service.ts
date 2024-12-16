import {BehaviorSubject, Observable, tap, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = localStorage.getItem('token') ?? null;
  private usuarioSubject = new BehaviorSubject<string | null>(null); // Observable para el nombre del usuario

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login', credentials)
      .pipe(
        tap(response => {
          if (response?.jwt) {
            this.token = response.jwt;
            localStorage.setItem('token', this.token ?? '');
            this.setUsuario(credentials.username); // Guarda el nombre del usuario
          } else {
            console.error('JWT no encontrado en la respuesta:', response);
          }
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null); // Limpiar usuario
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  getToken(): string | null {
    return this.token;
  }

  setUsuario(username: string): void {
    this.usuarioSubject.next(username); // Actualiza el nombre del usuario
  }
}
