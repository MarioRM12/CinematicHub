import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ListaService } from "../../service/listaService.service";
import { UsuarioService } from "../../service/usuarioService.service";
import { Pelicula } from "../../interface/peliculas.interfaces";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DetalleComponent implements OnInit {
  detalle: any = null; // Modelo de datos de la película
  errorMessage: string = ''; // Manejo de errores

  constructor(
    private http: HttpClient,
    private listaService: ListaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const selectedId = localStorage.getItem('selectedId'); // Obtener ID seleccionado del almacenamiento local

    if (selectedId) {
      const movieUrl = `http://localhost:8080/api/tmdb/movie/${selectedId}`; // URL de películas

      // Petición al backend para obtener detalles de la película
      this.http.get(movieUrl).subscribe(
        (response: any) => {
          this.detalle = response; // Guardar respuesta en el modelo
        },
        (error) => {
          this.errorMessage = 'No se encontraron detalles para el ID seleccionado.'; // Manejo de error
          console.error('Error al obtener detalles de la película:', error);
        }
      );
    } else {
      this.errorMessage = 'No se seleccionó ningún elemento.'; // Mensaje si no hay ID seleccionado
    }
  }

  agregarAPrimeraLista(): void {
    const username = localStorage.getItem('usuario');

    if (username && this.detalle) {
      this.usuarioService.oneByUsername(username).subscribe(
        (usuario) => {
          if (usuario.listas?.length > 0) {
            const primeraLista = usuario.listas[0]; // Primer lista del usuario
            const nuevaPelicula = {
              idPelicula: this.detalle.id,
              titulo: this.detalle.title,
              descripcion: this.detalle.overview || '',
              imagen: this.detalle.poster_path
                ? `https://image.tmdb.org/t/p/w500/${this.detalle.poster_path}`
                : '',
            };

            // Verificar si la película existe antes de agregarla
            this.listaService.verificaOCreaPeliculaYAgrega(
              nuevaPelicula,
              primeraLista.idLista
            ).subscribe(
              (respuesta) => {
                alert('Película añadida a tu lista con éxito.');
              },
              (error) => {
                console.error(
                  'Error al agregar la película a la lista:',
                  error
                );
                alert('Hubo un problema al agregar la película.');
              }
            );

          } else {
            alert('No tienes listas creadas.');
          }
        },
        (error) => {
          console.error('Error al obtener usuario:', error);
          alert('No se pudo obtener el usuario logueado.');
        }
      );
    } else {
      console.error('Usuario no está logueado o no hay detalles de película.');
      alert('No estás logueado o no se cargaron los detalles de la película.');
    }
  }
}
