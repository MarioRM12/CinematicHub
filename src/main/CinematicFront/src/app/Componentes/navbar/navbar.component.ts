import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Pelicula} from "../../interface/peliculas.interfaces";
import {PeliculaService} from "../../service/peliculaService.service";
import {SerieService} from "../../service/serieService.service";
import {NgFor} from "@angular/common";
import {Serie} from "../../interface/series.interfaces";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  peliculas: Pelicula[] = [];
  series: Serie[] = [];

  constructor(private peliculaservice: PeliculaService,
              private seriesService: SerieService) { }

  ngOnInit(): void {
    this.peliculaservice.getPeliculas().subscribe(data => {
      this.peliculas = data;
    });
    this.seriesService.getSeries().subscribe(data => {
      this.series = data;
    });
  }

}
