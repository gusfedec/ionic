import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor() {}

  getErrors(code): String {
    switch (code) {
      case 'auth/invalid-email':
        return 'Correo Electrónico Invalido o debe ingresar un Correo Electrónico.';
        break;
      case 'auth/internal-error':
        return 'Hubo un error interno.';
        break;
      case 'auth/weak-password':
        return 'El password debe contener 6 caracteres como mínimo.';
        break;
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso por otra cuenta.';
        break;
      case 'auth/wrong-password':
        return 'Contraseña inválida.';
        break;
      case 'auth/too-many-requests':
        return 'Se bloqueó este dispositivo por actividad inusual. Intente mas tarde.';
        break;
      default:
        break;
    }
  }
}
