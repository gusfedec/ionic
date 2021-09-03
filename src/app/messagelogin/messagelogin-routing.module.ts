import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageloginPage } from './messagelogin.page';

const routes: Routes = [
  {
    path: '',
    component: MessageloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageloginPageRoutingModule {}
