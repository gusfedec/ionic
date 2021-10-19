import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisFotosPageRoutingModule } from './mis-fotos-routing.module';

import { MisFotosPage } from './mis-fotos.page';
import { SharedModule } from '../shared/shared.module';
import { LogoutComponent } from '../logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisFotosPageRoutingModule,
    SharedModule,
  ],
  declarations: [MisFotosPage, LogoutComponent],
})
export class MisFotosPageModule {}
