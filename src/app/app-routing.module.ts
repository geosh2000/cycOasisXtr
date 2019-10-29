import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtranetComponent } from './components/extranet/extranet.component';
import { ExtranetListComponent } from './components/extranet/extranet-list/extranet-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/extranet', pathMatch: 'full' },

  // Extranet
  { path: 'extranet', component: ExtranetComponent },
  { path: 'extranetList', component: ExtranetListComponent },
  { path: 'extranet/:loc', component: ExtranetComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
