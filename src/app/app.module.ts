import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

//Services
import { NavbarService, AsesoresService, LoginService, CredentialsService, TokenCheckService, ApiService, InitService, GlobalServicesService } from './services/service.index';


//Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDragDropModule } from 'ng-drag-drop';

import { UiSwitchModule } from 'ngx-ui-switch';
import { OrderModule } from 'ngx-order-pipe';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { RouterModule } from '@angular/router';
import { Ng2CompleterModule } from 'ng2-completer';
import { CommonModule } from '@angular/common';

// Pipes
import { KeysPipe } from './pipes/keys.pipe';
import { CapitalizadoPipe } from './pipes/capitalizado.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { NoAcentosPipe } from './pipes/no-acentos.pipe';

// Components
import { AsistenciaBadgeComponent } from './shared/buttons/asistencia-badge/asistencia-badge.component';
import { BonoApproveComponent } from './shared/buttons/bono-approve/bono-approve.component';
import { ExtraSwitchComponent } from './shared/buttons/extra-switch/extra-switch.component';
import { PuntualidadBadgeComponent } from './shared/buttons/puntualidad-badge/puntualidad-badge.component';
import { SaBadgeComponent } from './shared/buttons/sa-badge/sa-badge.component';
import { LoginComponent } from './shared/login/login.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PbxStatusComponent } from './shared/pbx-status/pbx-status.component';
import { SearchAsesorComponent } from './shared/search-asesor/search-asesor.component';
import { TableTemplateComponent } from './shared/table-template/table-template.component';
import { CsvComponent } from './shared/upload/csv/csv.component';
import { CumplimientoComponent } from './shared/progress/cumplimiento/cumplimiento.component';
import { AsesorFilterComponent } from './shared/filters/asesor-filter/asesor-filter.component';
import { UserPreferencesComponent } from './shared/user-preferences/user-preferences.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PdvBadgeComponent } from './shared/buttons/pdv-badge/pdv-badge.component';
import { DetalleAsesoresComponent } from './components/hc/detalle-asesores/detalle-asesores.component';
import { DetVacacionesComponent } from './components/hc/detalle-asesores/det-vacaciones/det-vacaciones.component';
import { DetDiasPendientesComponent } from './components/hc/detalle-asesores/det-dias-pendientes/det-dias-pendientes.component';
import { DetDetalleComponent } from './components/hc/detalle-asesores/det-detalle/det-detalle.component';
import { DetContratoComponent } from './components/hc/detalle-asesores/det-contrato/det-contrato.component';
import { DetSalarioComponent } from './components/hc/detalle-asesores/det-salario/det-salario.component';
import { DetHistorialComponent } from './components/hc/detalle-asesores/det-historial/det-historial.component';
import { DetHorarioComponent } from './components/hc/detalle-asesores/det-horario/det-horario.component';
import { UploadImageComponent } from './components/formularios/upload-image.component';
import { AddAusentismoComponent } from './components/formularios/add-ausentismo.component';
import { PyaExceptionComponent } from './components/formularios/pya-exception.component';
import { EditDetailsComponent } from './components/formularios/edit-details.component';
import { SetBajaComponent } from './components/formularios/set-baja.component';
import { AddContratoComponent } from './components/formularios/add-contrato.component';
import { ReingresoAsesorComponent } from './components/formularios/reingreso-asesor.component';
import { CambioPuestoComponent } from './components/formularios/cambio-puesto.component';
import { JornadasComponent } from './components/asistencia/jornadas.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { PopoverModule } from 'ngx-popover';
import { AddNewAgentComponent } from './components/formularios/add-new-agent/add-new-agent.component';
import { AltasBatchComponent } from './components/hc/altas-batch/altas-batch.component';
import { BatchAsesorFormComponent } from './components/hc/altas-batch/batch-asesor-form/batch-asesor-form.component';
import { CargaHorariosComponent } from './components/asistencia/carga-horarios/carga-horarios.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { Select2Module } from 'ng2-select2';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { SearchHotelModuleComponent } from './components/cotizador/search-hotel-module/search-hotel-module.component';
import { FillPipe } from './pipes/fill.pipe';
import { HorariosSemanaComponent } from './components/home/horarios-semana/horarios-semana.component';
import { PersonalDataComponent } from './components/home/personal-data.component';
import { CotizadorV2Component } from './components/cotizador/cotizador-v2.component';
import { CreateRsvComponent } from './components/cotizador/create-rsv/create-rsv.component';
import { SearchZdUserComponent } from './shared/search-zd-user/search-zd-user.component';
import { CcSuperAssignComponent } from './components/config/cc-super-assign/cc-super-assign.component';
import { CotHabDetailComponent } from './components/cotizador/cot-hab-detail/cot-hab-detail.component';
import { SearchLocComponent } from './shared/search-loc/search-loc.component';
import { RsvManageComponent } from './components/rsv/rsv-manage/rsv-manage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    // Pipes
    KeysPipe,
    CapitalizadoPipe,
    DomseguroPipe,
    NoAcentosPipe,

    //Components
    AsistenciaBadgeComponent,
    BonoApproveComponent,
    ExtraSwitchComponent,
    PuntualidadBadgeComponent,
    SaBadgeComponent,
    AsesorFilterComponent,
    LoginComponent,
    LogoutComponent,
    NavbarComponent,
    PbxStatusComponent,
    CumplimientoComponent,
    SearchAsesorComponent,
    TableTemplateComponent,
    CsvComponent,
    UserPreferencesComponent,
    SidebarComponent,
    PdvBadgeComponent,
    DetalleAsesoresComponent,
    DetVacacionesComponent,
    DetDiasPendientesComponent,
    DetDetalleComponent,
    DetContratoComponent,
    DetSalarioComponent,
    DetHistorialComponent,
    DetHorarioComponent,
    UploadImageComponent,
    AddAusentismoComponent,
    PyaExceptionComponent,
    EditDetailsComponent,
    SetBajaComponent,
    AddContratoComponent,
    ReingresoAsesorComponent,
    CambioPuestoComponent,
    JornadasComponent,
    AddNewAgentComponent,
    AltasBatchComponent,
    BatchAsesorFormComponent,
    CargaHorariosComponent,
    AsistenciaComponent,
    CotizadorComponent,
    SearchHotelModuleComponent,
    FillPipe,
    HorariosSemanaComponent,
    PersonalDataComponent,
    CotizadorV2Component,
    CreateRsvComponent,
    SearchZdUserComponent,
    CcSuperAssignComponent,
    CotHabDetailComponent,
    SearchLocComponent,
    RsvManageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    NgDragDropModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2CompleterModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule.forRoot({
      size: 'small',
    }),
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    
    OrderModule,
    MultiselectDropdownModule,
    Daterangepicker,
    PopoverModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true,
      autoFocus: true
    }),
    Select2Module,

    MatButtonModule, MatCheckboxModule,

    // ==================================================
    // START ANGULAR MATERIAL
    // ==================================================
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    // ==================================================
    // END ANGULAR MATERIAL
    // ==================================================

  ],
  providers: [
    NavbarService,
    AsesoresService,
    LoginService,
    CredentialsService,
    TokenCheckService,
    ApiService,
    InitService,
    GlobalServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
