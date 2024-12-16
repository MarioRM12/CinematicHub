import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from "@angular/router"; // asegura incluir ReactiveFormsModule
import {NgFor, NgIf} from "@angular/common";
import { PeliculaService } from "../../service/peliculaService.service";
import { SerieService } from "../../service/serieService.service";
import { Pelicula } from "../../interface/peliculas.interfaces";
import { Serie } from "../../interface/series.interfaces";
import { AuthService } from '../../service/auth.service';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http"; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  peliculas: Pelicula[] = [];
  series: Serie[] = [];
  loginForm: FormGroup;
  isSubmitted = false;
  errorMessage: string = '';
  usuario: string | null = null;
  searchControl: FormControl;
  suggestions: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private peliculaservice: PeliculaService,
    private seriesService: SerieService,
    protected authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {

    this.usuario = localStorage.getItem('usuario');
    // Configurar la búsqueda reactiva
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => this.fetchSuggestions(query))
      )
      .subscribe((response: any) => {
        this.suggestions = response.results || [];
        console.log(this.suggestions); // Verifica que estén llegando los datos con "title"
      });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  login() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    // Construye el objeto de credenciales esperado
    const credentials = {
      username: this.loginForm.value.usuario,
      password: this.loginForm.value.password
    };

    // Llama al servicio de autenticación con las credenciales
    this.authService.login(credentials).subscribe(
      (response: { jwt: string }) => {
        console.log('Iniciar sesión con éxito', response);

        // Almacenar el token en el almacenamiento local
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('usuario', credentials.username)

        // Redirige al usuario a la página de inicio
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Error al iniciar sesión', error);

        // Muestra un mensaje de error
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    );
  }
  goToProfile() {
    this.router.navigate(['/perfil']); // Asegúrate de que '/perfil' sea la ruta del componente perfil
  }

  // Método para obtener sugerencias de la API
  fetchSuggestions(query: string) {
    if (!query) {
      // Si no hay texto, vaciar las sugerencias
      this.suggestions = [];
      return [];
    }

    // Realizar una solicitud HTTP GET a la API
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=es-ES&page=1`;
    const headers = {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzE5NjI5MzEwMTVjMTJhMmY4OTZlOTBhYTljZjg2YiIsIm5iZiI6MTczMjA0NzI2Mi43ODUxNjkxLCJzdWIiOiI2NzFlOWNlMTM0YzBmYWJkNjgxZDA2NWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tLyuP8Kbpz8-Rm8KuimzAdL0LzBYr7855cz7YuBmfIE'
    };

    // Retornar un Observable que se procesa en el pipe
    return this.http.get(apiUrl, { headers });
  }

  onSuggestionClick(suggestion: any) {
    // Guarda el ID seleccionado en localStorage
    localStorage.setItem('selectedId', suggestion.id);

    // Vacía el campo de búsqueda y las sugerencias
    this.searchControl.setValue(''); // Limpia el buscador
    this.suggestions = [];          // Limpia las sugerencias

    // Navega al componente de detalles
    this.router.navigate(['/detalle']);
  }

}
