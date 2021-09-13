import { Injectable } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  logo: any;

  constructor(private animationController: AnimationController) {}

  girarLogo(selector, duration) {
    this.logo = this.animationController
      .create()
      .addElement(document.querySelector(selector))
      .duration(duration)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.2) rotate(360deg)' },
        { offset: 1, transform: 'scale(1) rotate(700deg) ' },
      ]);

    this.logo.play();
  }

  pararElemento() {
    this.logo.stop();
  }
}
