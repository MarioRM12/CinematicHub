import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuarioService.service';
import { Usuario, defaultUsuario } from '../../interface/usuario.interfaces';
import { CommonModule } from '@angular/common';
import {ListaService} from "../../service/listaService.service";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = { ...defaultUsuario }; // Usa el objeto predeterminado

  constructor(private usuarioService: UsuarioService, private listaService: ListaService) {}

  ngOnInit(): void {
    const username = localStorage.getItem('usuario'); // Obtén el username del almacenamiento local
    if (username) {
      this.usuarioService.oneByUsername(username).subscribe(
          (usuario: Usuario) => {
            // Asegúrate de usar valores seguros
            this.usuario = {
              ...defaultUsuario, // Valores predeterminados
              ...usuario,
              listas: usuario.listas || [] // Asegúrate de que las listas no sean nulas
            };
            console.log('Información del usuario:', this.usuario);
          },
          (error) => {
            console.error('Error al obtener la información del usuario', error);
          }
      );
    } else {
      console.error('No se encontró un username válido en localStorage');
    }
  }

  confirmarEliminarPelicula(idLista: number, idPelicula: number): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta película de tu lista?');
    if (confirmacion) {
      this.listaService.eliminarPeliculaDeLista(idLista, idPelicula).subscribe({
        next: () => {
          alert('Película eliminada con éxito.');
          this.ngOnInit(); // Refresca los datos del usuario
        },
        error: (err) => {
          console.error('Error al eliminar la película:', err);
          alert('No se pudo eliminar la película. Intenta de nuevo.');
        }
      });
    }
  }
}
