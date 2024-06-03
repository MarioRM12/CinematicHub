import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Pelicula } from "../../interface/peliculas.interfaces";
import { PeliculaService } from "../../service/peliculaService.service";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


}
