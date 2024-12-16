import {Serie} from "./series.interfaces";
import {Pelicula} from "./peliculas.interfaces";
import {Usuario} from "./usuario.interfaces";

export interface Lista {
  idLista: number;
  nombre: string;
  usuarioCreador: Usuario;
  fechaCreacion: string;
  peliculas: Array<Pelicula>;
  series: Array<Serie>;
}
