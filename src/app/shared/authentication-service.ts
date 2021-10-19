//https://www.positronx.io/ionic-firebase-authentication-tutorial-with-examples/
import { Injectable, NgZone } from '@angular/core';
//import { auth } from 'firebase/app';
import { User } from './user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  subject = new BehaviorSubject(false);
  usuario = new BehaviorSubject(null);

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        console.log(user);
        this.subject.next(true);
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        this.usuario.next(this.userData);
      } else {
        console.log('a');
        this.subject.next(false);
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        this.usuario.next(null);
      }
    });
  }

  // Pipe first value emitted and convert to promise
  isLoggedInn() {
    return this.ngFireAuth.authState.pipe(first()).toPromise();
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.subject.next(true);
        this.SetUserData(result.user);
        this.usuario.next(result.user);
      });
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.subject.next(true);
        this.SetUserData(result.user);
      });
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLogged(): boolean {
    return this.subject.value;
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return user !== null && user.emailVerified !== false ? true : false;
    return user !== null ? true : false;
  }

  getUser(): String {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUsuario(): any {
    return this.usuario.value;
  }

  // Returns true when user's email is verified
  /* get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  } */

  // Sign in with Gmail
  /* GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  } */

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    console.log(userRef);

    const userData = {
      uid: user.uid,
      email: user.email,
    };
    console.log(userData);

    return userRef.set(userData, {
      merge: true,
    });
  }

  getUserByKey(key) {
    return this.afStore.collection('users').doc(key).snapshotChanges();
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
