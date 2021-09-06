import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { ToastService } from '../shared/toast.service';
import { ErrorsService } from '../shared/errors.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  cargando: boolean = false;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService,
    public errorsService: ErrorsService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  logIn() {
    this.isSubmitted = true;
    this.cargando = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!');
      this.cargando = false;
      return false;
    } else {
      console.log(this.loginForm.value);
      this.authService
        .SignIn(this.loginForm.value.email, this.loginForm.value.password)
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
          // this.toastService.presentLoadingWithOptions();
          // setTimeout(() => {
          //   this.toastService.cancelLoading();
          // }, 1000);
        })
        .finally(() => (this.cargando = false));
    }
  }
}
