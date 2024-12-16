import {PeliculaService} from "../../service/peliculaService.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Component, OnInit} from "@angular/core";
import {NgFor, NgStyle, SlicePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SerieService} from "../../service/serieService.service";

@Component({
  selector: 'app-HomeComponent',
  standalone: true,
  imports: [RouterLink, NgFor, SlicePipe, NgStyle],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularMovies: any[] = [];
  upcomingMovies: any[] = [];
  TodayTVSeries: any[] = [];

  constructor(private peliculaService: PeliculaService,private serieService:SerieService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadPopularMovies();
    this.loadUpcomingMovies();
    this.loadTodayTVSeries();
  }

  loadTodayTVSeries(): void {
    this.serieService.getTodayTVSeries()
      .subscribe((response: any) => {
        if (response && response.results) {
          this.TodayTVSeries = response.results.map((serie: any) => ({
            id: serie.id,
            name: serie.title || 'Título no disponible',
            posterUrl: this.sanitizeImageUrl(`https://image.tmdb.org/t/p/w500${ serie.poster_path || ''}`),
          }));
        } else {
          console.warn('La respuesta no contiene los episodios de hoy');
        }
      }, error => {
        console.error('Error fetching Today Series', error);
      });
  }

  loadPopularMovies(): void {
    this.peliculaService.getPopularMovies()
      .subscribe((response: any) => {
        if (response && response.results) {
          this.popularMovies = response.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title || 'Título no disponible',
            description: movie.overview || 'Descripción no disponible',
            backdrop: this.sanitizeImageUrl(`https://image.tmdb.org/t/p/w500${movie.backdrop_path || ''}`),
            posterUrl: this.sanitizeImageUrl(`https://image.tmdb.org/t/p/w500${movie.poster_path || ''}`),
          }));
          console.log(this.popularMovies); // para ver la estructura de los objetos
        } else {
          console.warn('La respuesta no contiene películas populares');
        }
      }, error => {
        console.error('Error fetching popular movies', error);
      });
  }

  loadUpcomingMovies(): void {
    this.peliculaService.getUpcomingMovies()
      .subscribe((response: any) => {
        if (response && response.results) {
          this.upcomingMovies = response.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title || 'Título no disponible',
            releaseDate: movie.release_date || 'Fecha de lanzamiento no disponible',
            posterUrl: this.sanitizeImageUrl(`https://image.tmdb.org/t/p/w500${movie.poster_path || ''}`),
          }));
        } else {
          console.warn('La respuesta no contiene próximas películas');
        }
      }, error => {
        console.error('Error fetching upcoming movies', error);
      });
  }

  sanitizeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
