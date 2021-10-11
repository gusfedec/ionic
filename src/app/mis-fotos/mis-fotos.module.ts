import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisFotosPageRoutingModule } from './mis-fotos-routing.module';

import { MisFotosPage } from './mis-fotos.page';
import { GetUserFromEmail } from '../get-user-from-email.pipe';
import { LogoutComponent } from '../logout/logout.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MisFotosPageRoutingModule],
  declarations: [MisFotosPage, GetUserFromEmail, LogoutComponent],
})
export class MisFotosPageModule {}
