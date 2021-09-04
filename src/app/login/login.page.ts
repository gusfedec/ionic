import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { ToastService } from '../shared/toast.service';
import { ErrorsService } from '../shared/errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService,
    public errorsService: ErrorsService
  ) {}

  ngOnInit() {}

  logIn(email, password) {
    this.authService
      .SignIn(email.value, password.value)
      .then((res) => {
        console.log(res);
        this.router.navigate(['messagelogin']);
        /* if (this.authService.isEmailVerified) {
          
        } else {
          window.alert('Email is not verified');
          return false;
        } */
      })
      .catch((error) => {
        console.log(error.code);
        let err = this.errorsService.getErrors(error.code);
        this.toastService.presentToast(err);
        //this.toastService.presentLoading();
        this.toastService.presentLoadingWithOptions();
        setTimeout(() => {
          this.toastService.cancelLoading();
        }, 1000);
      });
  }
}
