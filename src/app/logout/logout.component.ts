import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication-service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-logout',
  template: ` <ion-text>{{ usuario.email }}</ion-text>
    <ion-icon
      name="log-out-outline"
      (click)="signOut()"
      style="font-size:40px; vertical-align:middle;"
    ></ion-icon>`,
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  usuario: any;
  cargando: boolean = false;

  constructor(
    public authService: AuthenticationService,
    public toastService: ToastService
  ) {
    this.usuario = this.authService.getUsuario();
    console.log(this.authService.getUsuario());
    console.log(this.authService.isLogged);
    console.log(this.usuario);
  }

  ngOnInit() {}

  signOut() {
    this.toastService.presentLoadingWithOptions();

    this.cargando = true;
    this.authService.SignOut().finally(() => {
      setTimeout(() => {
        this.toastService.cancelLoading();
      }, 500);
    });
  }
}
