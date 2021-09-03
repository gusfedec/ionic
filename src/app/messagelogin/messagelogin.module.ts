import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageloginPageRoutingModule } from './messagelogin-routing.module';

import { MessageloginPage } from './messagelogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageloginPageRoutingModule
  ],
  declarations: [MessageloginPage]
})
export class MessageloginPageModule {}
