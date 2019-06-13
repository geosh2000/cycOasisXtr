import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DetalleAsesoresComponent } from './components/hc/detalle-asesores/detalle-asesores.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'detalle-asesores', component: DetalleAsesoresComponent },
  { path: 'detalle-asesores/:id', component: DetalleAsesoresComponent },
  { path: 'detalle-asesores/:id/:tipo', component: DetalleAsesoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }