import { Routes } from '@angular/router';
import { HomeComponent } from "./Componentes/home/home.component";
import {FrameQuizzComponent} from "./Componentes/frame-quizz/frame-quizz.component";

export const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'home', component: HomeComponent},
  { path: 'FrameQuizz', component: FrameQuizzComponent},
  { path: '**', component: HomeComponent}
];
