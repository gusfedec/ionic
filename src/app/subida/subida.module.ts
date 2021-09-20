import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubidaPageRoutingModule } from './subida-routing.module';

import { SubidaPage } from './subida.page';
import { UploadComponent } from '../upload/upload.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SubidaPageRoutingModule],
  declarations: [SubidaPage, UploadComponent],
})
export class SubidaPageModule {}
