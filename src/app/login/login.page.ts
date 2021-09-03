import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService
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
        this.toastService.presentToast(error.message);
      });
  }
}
