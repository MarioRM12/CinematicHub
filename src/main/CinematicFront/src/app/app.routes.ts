import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './Componentes/home/home.component';
import { FrameQuizzComponent } from './Componentes/frame-quizz/frame-quizz.component';
import {NgModule} from "@angular/core";
import {PeliculaComponent} from "./Componentes/pelicula/pelicula.component";
import {ListaComponent} from "./Componentes/lista/lista.component";
import {RegistroComponent} from "./Componentes/registro/registro.component";
import {SerieComponent} from "./Componentes/serie/serie.component";
import {AdminComponent} from "./Componentes/admin/admin.component";
import {PerfilComponent} from "./Componentes/perfil/perfil.component";
import {DetalleComponent} from "./Componentes/detalle/detalle.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'lista', component: ListaComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'FrameQuizz', component: FrameQuizzComponent },
  { path: 'serie/**', component: SerieComponent },
  { path: 'pelicula/**', component: PeliculaComponent },
  { path: 'login', component: RegistroComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
