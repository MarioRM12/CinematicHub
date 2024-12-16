import { Component, OnInit } from '@angular/core';
import { PeliculaService } from "../../service/peliculaService.service";
import { SerieService } from "../../service/serieService.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-frame-quizz',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './frame-quizz.component.html',
  styleUrls: ['./frame-quizz.component.scss'],
})
export class FrameQuizzComponent implements OnInit {
  currentItem: any = null;
  isSeries: boolean = false; // Determina si es serie o película
  blurLevel: number = 10; // Nivel de desenfoque inicial
  guessInput: string = ''; // Entrada del usuario
  hasWon: boolean = false; // Indica si el jugador acertó
  attemptsLeft: number = 5; // Número de intentos disponibles
  allTitles: string[] = []; // Lista de todos los títulos
  errorList: number[] = [1, 2, 3, 4, 5]; // Pista para gestionar errores visualmente

  constructor(
    private peliculaService: PeliculaService,
    private serieService: SerieService
  ) {}

  ngOnInit(): void {
    this.loadRandomItem();
    this.loadAllTitles(); // Cargar todos los títulos
  }

  // Cambia entre serie y película y reinicia el juego
  toggleType(): void {
    this.isSeries = !this.isSeries;
    this.loadRandomItem();
    this.resetGame();
  }

  // Restaura todo para un nuevo juego
  resetGame(): void {
    this.blurLevel = 10;
    this.hasWon = false;
    this.guessInput = '';
    this.attemptsLeft = 5;
    this.errorList = [1, 2, 3, 4, 5];
  }

  // Carga un elemento aleatorio
  loadRandomItem(): void {
    const service = this.isSeries
      ? this.serieService.getTodayTVSeries()
      : this.peliculaService.getPopularMovies();

    service.subscribe(
      (response: any) => {
        const list = response?.results || [];
        this.selectRandomItem(list);
      },
      (error) => console.error('Error al cargar elementos:', error)
    );
  }

  // Selecciona aleatoriamente un título y guarda información clave
  selectRandomItem(list: any[]): void {
    if (list.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.length);
      const selected = list[randomIndex];

      // Guardamos título original y normalizado
      this.currentItem = {
        title: selected?.title || selected?.name || "desconocido",
        normalizedTitle: this.normalize(selected?.title || selected?.name || ""), // < -- Aquí se usa normalize
        posterUrl: `https://image.tmdb.org/t/p/w500${selected?.poster_path || ""}`,
      };
    } else {
      console.warn("No se encontraron elementos en la lista.");
    }
  }

// Validación: Ignorar mayúsculas, minúsculas, espacios extra y caracteres especiales
// Normalización reutilizable
  normalize(input: string): string {
    return input
      .trim()
      .toLowerCase()
      .normalize("NFD") // Remueve acentos
      .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
      .replace(/[^a-z0-9]/g, ""); // Quita caracteres especiales
  }

// Validación: Compara el título normalizado y la entrada normalizada
  isCorrectGuess(): boolean {
    if (!this.guessInput || !this.currentItem?.title) {
      return false;
    }

    // Compara los valores normalizados
    return (
      this.normalize(this.guessInput) === this.currentItem.normalizedTitle
    );
  }

  // Maneja cada intento de adivinar el título
  makeGuess(): void {
    console.log("Valor sin procesar (raw) de guessInput:", this.guessInput);
    console.log("Valor de guessInput ANTES de normalizar:", this.guessInput);
    console.log("Entrada normalizada:", this.normalize(this.guessInput));
    console.log("Título esperado normalizado:", this.currentItem.normalizedTitle);

    if (this.isCorrectGuess()) {
      this.hasWon = true;
      this.blurLevel = 0;
    } else {
      // Intento fallido
      this.attemptsLeft--;
      this.errorList.pop();
      this.blurLevel = Math.max(this.blurLevel - 2, 0);

      if (this.attemptsLeft === 0) {
        alert(
          `-Juego terminado-. El título era: "${this.currentItem.title}"`
        );
      }
    }

    this.guessInput = ''; // Limpia input
  }

  // Carga todos los títulos para usarlos como sugerencias
  loadAllTitles(): void {
    const service = this.isSeries
      ? this.serieService.getTodayTVSeries()
      : this.peliculaService.getPopularMovies();

    service.subscribe(
      (response: any) => {
        this.allTitles = response?.results
          .map((item: any) => item.title || item.name)
          .map((title: string) => this.normalize(title)); // Normalizamos los títulos
      },
      (error) =>
        console.error("Error al cargar títulos para las opciones:", error)
    );
  }
}
