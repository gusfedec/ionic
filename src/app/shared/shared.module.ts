import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUserFromEmail } from '../get-user-from-email.pipe';

@NgModule({
  declarations: [GetUserFromEmail],
  exports: [GetUserFromEmail],
  providers: [GetUserFromEmail],
  imports: [CommonModule],
})
export class SharedModule {}
