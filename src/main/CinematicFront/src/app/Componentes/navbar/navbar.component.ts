import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Pelicula} from "../../interface/peliculas.interfaces";
import {PeliculaService} from "../../service/peliculaService.service";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  peliculas: Pelicula[] = [];

  constructor(private peliculaservice: PeliculaService) { }

  ngOnInit(): void {
    this.peliculaservice.getPeliculas().subscribe(data => {
      this.peliculas = data;
    });
  }

}
