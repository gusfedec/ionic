import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubidaPageRoutingModule } from './subida-routing.module';

import { SubidaPage } from './subida.page';
import { UploadComponent } from '../upload/upload.component';
import { LogoutComponent } from '../logout/logout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubidaPageRoutingModule,
    SharedModule,
  ],
  declarations: [SubidaPage, UploadComponent, LogoutComponent],
})
export class SubidaPageModule {}
