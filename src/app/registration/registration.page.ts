import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { ToastService } from '../shared/toast.service';
import { ErrorsService } from '../shared/errors.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registerForm: FormGroup;
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
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get errorControl() {
    return this.registerForm.controls;
  }

  signUp() {
    this.cargando = true;
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      console.log('Please provide all the required values!');
      this.cargando = false;
      return false;
    } else {
      console.log(this.registerForm.value);
      this.authService
        .RegisterUser(
          this.registerForm.value.email,
          this.registerForm.value.password
        )
        .then((res) => {
          this.router.navigate(['dashboard']);
        })
        .catch((error) => {
          console.log(error.code);
          let err = this.errorsService.getErrors(error.code);
          this.toastService.presentToast(err);
        })
        .finally(() => (this.cargando = false));
    }
  }
  goToLoginPage() {
    this.router.navigate(['login']);
  }
}
