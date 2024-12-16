import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../service/peliculaService.service';
import { Pelicula } from '../../interface/peliculas.interfaces';
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  imports: [NgFor],
  standalone: true,
  styleUrls: ['./pelicula.component.scss']
})
export class PeliculaComponent implements OnInit {
  peliculas: Pelicula[] = [];
  pelicula: Pelicula | undefined;

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.getPeliculas();
  }

  getPeliculas(): void {
    this.peliculaService.getAllPeliculas().subscribe(peliculas => {
      this.peliculas = peliculas;
    });
  }

  getPelicula(id: number): void {
    this.peliculaService.getPelicula(id).subscribe(pelicula => {
      this.pelicula = pelicula;
    });
  }

  addPelicula(pelicula: Pelicula): void {
    this.peliculaService.addPelicula(pelicula).subscribe(nuevaPelicula => {
      this.peliculas.push(nuevaPelicula);
    });
  }

  updatePelicula(pelicula: Pelicula): void {
    this.peliculaService.updatePelicula(pelicula).subscribe(peliculaActualizada => {
      const index = this.peliculas.findIndex(p => p.idPelicula === peliculaActualizada.idPelicula);
      if (index !== -1) {
        this.peliculas[index] = peliculaActualizada;
      }
    });
  }

  deletePelicula(id: number): void {
    this.peliculaService.deletePelicula(id).subscribe(() => {
      this.peliculas = this.peliculas.filter(p => p.idPelicula !== id);
    });
  }
}
