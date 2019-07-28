import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DetalleAsesoresComponent } from './components/hc/detalle-asesores/detalle-asesores.component';
import { CargaHorariosComponent } from './components/asistencia/carga-horarios/carga-horarios.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { CotizadorV2Component } from './components/cotizador/cotizador-v2.component';
import { CcSuperAssignComponent } from './components/config/cc-super-assign/cc-super-assign.component';
import { RsvManageComponent } from './components/rsv/rsv-manage/rsv-manage.component';
import { AddExternalUserComponent } from './components/config/add-external-user/add-external-user.component';
import { PrintVoucherComponent } from './components/pagos/print-voucher/print-voucher.component';
import { RsvListComponent } from './components/rsv/rsv-list/rsv-list.component';
import { RsvPaymentListComponent } from './components/rsv/rsv-payment-list/rsv-payment-list.component';
import { CieloListComponent } from './components/cielo/cielo-list/cielo-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'detalle-asesores', component: DetalleAsesoresComponent },
  { path: 'detalle-asesores/:id', component: DetalleAsesoresComponent },
  { path: 'detalle-asesores/:id/:tipo', component: DetalleAsesoresComponent },

  { path: 'asistencia', component: AsistenciaComponent },
  { path: 'asistencia/editarHorarios', component: CargaHorariosComponent },
  
  { path: 'config/addExternal', component: AddExternalUserComponent },

  { path: 'cotizador', component: CotizadorV2Component },
  // { path: 'cotizadorV2', component: CotizadorV2Component },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'rsv', component: RsvManageComponent },
  { path: 'rsv/:loc', component: RsvManageComponent },
  { path: 'rsvList', component: RsvListComponent },
  { path: 'rsvPaymentList', component: RsvPaymentListComponent },
  
  { path: 'cieloList', component: CieloListComponent },

  { path: 'config/chgSuperCC', component: CcSuperAssignComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }