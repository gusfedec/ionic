import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BotonesPrincipalesPage } from './botones-principales.page';

const routes: Routes = [
  {
    path: '',
    component: BotonesPrincipalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotonesPrincipalesPageRoutingModule {}
