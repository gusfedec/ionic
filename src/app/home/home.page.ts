import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { AnimationController } from '@ionic/angular';
import { AnimationService } from '../shared/animation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animation: any;
  animation1: any;
  constructor(
    private animationController: AnimationController,
    private router: Router,
    private animationService: AnimationService
  ) {}

  async ionViewDidEnter() {
    SplashScreen.hide();
    this.animation = this.animationController
      .create()
      .addElement(document.querySelector('.splash'))
      .duration(3000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.2) rotate(360deg)' },
        { offset: 1, transform: 'scale(1) rotate(700deg) ' },
      ]);

    this.animation.play();

    this.animation1 = this.animationController
      .create()
      .addElement(document.querySelector('.logo'))
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(500px)')
      .fromTo('opacity', '1', '0.2');
    this.animation1.play();

    const animation = this.animationController
      .create()
      .addElement(document.querySelector('#container'))
      .duration(300000)
      .fromTo('opacity', '1', '0');
    await animation.play();

    /* const animation2 = this.animationController
      .create()
      .addElement(document.querySelector('.logo'))
      .duration(3000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, background: 'red' },
        { offset: 0.72, background: 'var(--background)' },
        { offset: 1, background: 'green' },
      ]);
    await animation2.play();

    const animation3 = this.animationController
      .create()
      .addElement(document.querySelector('.logo'))
      .duration(3000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, background: 'red' },
        { offset: 0.72, background: 'var(--background)' },
        { offset: 1, background: 'green' },
      ]);
    await animation3.play(); */

    this.router.navigateByUrl('login');
  }

  stop() {
    //this.animationService.pararElemento();
    this.animation.stop();
  }
}
