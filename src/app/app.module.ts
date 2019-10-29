import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// Services
import { NavbarService, AsesoresService, LoginService, CredentialsService, TokenCheckService, ApiService, InitService, GlobalServicesService, RrobinService } from './services/service.index';


// Components
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

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDragDropModule } from 'ng-drag-drop';
import { TableModule } from 'ngx-easy-table';

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
import { LoginComponent } from './shared/login/login.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SearchAsesorComponent } from './shared/search-asesor/search-asesor.component';
import { TableTemplateComponent } from './shared/table-template/table-template.component';
import { AsesorFilterComponent } from './shared/filters/asesor-filter/asesor-filter.component';
import { UserPreferencesComponent } from './shared/user-preferences/user-preferences.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { Daterangepicker } from 'ng2-daterangepicker';
import { PopoverModule } from 'ngx-popover';
import { ContextMenuModule } from 'ngx-contextmenu';
import { Select2Module } from 'ng2-select2';

import { FillPipe } from './pipes/fill.pipe';

import { ExtranetComponent } from './components/extranet/extranet.component';
import { ExtPapeletaComponent } from './components/extranet/ext-papeleta.component';
import { ExtranetListComponent } from './components/extranet/extranet-list/extranet-list.component';

@NgModule({
  declarations: [
    AppComponent,
    
    // Pipes
    KeysPipe,
    CapitalizadoPipe,
    DomseguroPipe,
    NoAcentosPipe,

    // Components
    AsesorFilterComponent,
    LoginComponent,
    LogoutComponent,
    NavbarComponent,
    SearchAsesorComponent,
    TableTemplateComponent,
    UserPreferencesComponent,
    SidebarComponent,
    
    
    FillPipe,
    
    ExtranetComponent,
    ExtPapeletaComponent,
    ExtranetListComponent

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
    NgbModule,
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
    TableModule,

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
    GlobalServicesService,
    RrobinService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
