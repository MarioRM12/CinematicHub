import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UsuarioService } from '../../service/usuarioService.service';
import {CommonModule} from "@angular/common";
import {ListaService} from "../../service/listaService.service";
import {SerieService} from "../../service/serieService.service";
import {PeliculaService} from "../../service/peliculaService.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminName: string = localStorage.getItem('usuario') || 'Admin';

  usuarioForm: FormGroup;
  peliculaForm: FormGroup;
  serieForm: FormGroup;
  listaForm: FormGroup;

  usuariosList: any[] = [];
  peliculasList: any[] = [];
  seriesList: any[] = [];
  listasList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private peliculaService: PeliculaService,
    private serieService: SerieService,
    private listaService: ListaService
  ) {
    this.usuarioForm = this.fb.group({
      idUsuario: [''], // ID solo para edición
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });

    this.peliculaForm = this.fb.group({
      idPelicula: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.serieForm = this.fb.group({
      idSerie: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.listaForm = this.fb.group({
      idLista: [''],
      fechaCreacion: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadPeliculas();
    this.loadSeries();
    this.loadListas();
    console.log(this.usuariosList);
    console.log(this.peliculasList);
    console.log(this.seriesList);
    console.log(this.listasList);
  }

  // Métodos de Usuarios
  loadUsuarios(): void {
    // Llama al servicio para cargar todos los usuarios
    this.usuarioService.all().subscribe(usuarios => this.usuariosList = usuarios);
  }

  onSaveUsuario(): void {
    const usuario = this.usuarioForm.value;

    if (usuario.idUsuario) {
      // Si hay un ID, es una edición
      this.usuarioService.replace(usuario.idUsuario, usuario).subscribe(() => {
        alert('Usuario actualizado correctamente');
        this.loadUsuarios(); // Recargar la lista de usuarios
      });
    } else {
      // Si no hay ID, es una creación
      this.usuarioService.registrarUsuario(usuario).subscribe(() => {
        alert('Usuario creado correctamente');
        this.loadUsuarios(); // Recargar la lista de usuarios
      });
    }
    this.usuarioForm.reset(); // Reinicia el formulario
  }

  onEditUsuario(usuario: any): void {
    this.usuarioForm.patchValue(usuario); // Rellena el formulario con los valores del usuario a editar
  }

  onDeleteUsuario(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este usuario?')) {
      this.usuarioService.delete(id).subscribe(() => {
        alert('Usuario eliminado correctamente');
        this.loadUsuarios(); // Recargar la lista de usuarios
      });
    }
  }

  // Métodos de Películas
  loadPeliculas(): void {
    this.peliculaService.getAllPeliculas().subscribe(
      peliculas => this.peliculasList = peliculas,
      error => console.error('Error al cargar todas las películas:', error)
    );
  }

  onSavePelicula(): void {
    const pelicula = this.peliculaForm.value;

    if (pelicula.idPelicula) {
      this.peliculaService.updatePelicula(pelicula).subscribe(
        () => {
          alert('Película actualizada correctamente');
          this.loadPeliculas();
        },
        error => console.error('Error al actualizar la película:', error)
      );
    } else {
      this.peliculaService.addPelicula(pelicula).subscribe(
        () => {
          alert('Película creada correctamente');
          this.loadPeliculas();
        },
        error => console.error('Error al crear la película:', error)
      );
    }

    this.peliculaForm.reset();
  }

  onEditPelicula(pelicula: any): void {
    this.peliculaForm.patchValue(pelicula);
  }

  onDeletePelicula(id: number): void {
    if (confirm('¿Está seguro que desea eliminar esta película?')) {
      this.peliculaService.deletePelicula(id).subscribe(
        () => {
          alert('Película eliminada correctamente');
          this.loadPeliculas();
        },
        error => console.error('Error al eliminar la película:', error)
      );
    }
  }

  // Métodos de Series
  loadSeries(): void {
    this.serieService.getAllSeries().subscribe(
      series => this.seriesList = series,
      error => console.error('Error al cargar todas las series:', error)
    );
  }

  onSaveSerie(): void {
    const serie = this.serieForm.value;

    if (serie.idSerie) {
      this.serieService.updateSerie(serie).subscribe(
        () => {
          alert('Serie actualizada correctamente');
          this.loadSeries();
        },
        error => console.error('Error al actualizar la serie:', error)
      );
    } else {
      this.serieService.addSerie(serie).subscribe(
        () => {
          alert('Serie creada correctamente');
          this.loadSeries();
        },
        error => console.error('Error al crear la serie:', error)
      );
    }

    this.serieForm.reset();
  }

  onEditSerie(serie: any): void {
    this.serieForm.patchValue(serie);
  }

  onDeleteSerie(id: number): void {
    if (confirm('¿Está seguro que desea eliminar esta serie?')) {
      this.serieService.deleteSerie(id).subscribe(
        () => {
          alert('Serie eliminada correctamente');
          this.loadSeries();
        },
        error => console.error('Error al eliminar la serie:', error)
      );
    }
  }


  // Métodos de Listas
  loadListas(): void {
    this.listaService.getAllListas().subscribe(
      listas => this.listasList = listas,
      error => console.error('Error al cargar todas las listas:', error)
    );
  }
  onSaveLista(): void {
    const lista = this.listaForm.value;

    if (lista.idLista) {
      this.listaService.updateLista(lista).subscribe(
        () => {
          alert('Lista actualizada correctamente');
          this.loadListas();
        },
        error => console.error('Error al actualizar la lista:', error)
      );
    } else {
      this.listaService.addLista(lista).subscribe(
        () => {
          alert('Lista creada correctamente');
          this.loadListas();
        },
        error => console.error('Error al crear la lista:', error)
      );
    }

    this.listaForm.reset();
  }

  onEditLista(lista: any): void {
    this.listaForm.patchValue(lista);
  }

  onDeleteLista(id: number): void {
    if (confirm('¿Está seguro que desea eliminar esta lista?')) {
      this.listaService.deleteLista(id).subscribe(
        () => {
          alert('Lista eliminada correctamente');
          this.loadListas();
        },
        error => console.error('Error al eliminar la lista:', error)
      );
    }
  }
}
