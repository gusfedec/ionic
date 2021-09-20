import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubidaPage } from './subida.page';

const routes: Routes = [
  {
    path: '',
    component: SubidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubidaPageRoutingModule {}
