import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BotonesPrincipalesPageRoutingModule } from './botones-principales-routing.module';

import { BotonesPrincipalesPage } from './botones-principales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BotonesPrincipalesPageRoutingModule
  ],
  declarations: [BotonesPrincipalesPage]
})
export class BotonesPrincipalesPageModule {}
