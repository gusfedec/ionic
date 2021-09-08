import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private animationController: AnimationController,
    private router: Router
  ) {}

  async ionViewDidEnter() {
    SplashScreen.hide();
    const animation = this.animationController
      .create()
      .addElement(document.querySelector('#container'))
      .duration(3000)
      .fromTo('opacity', '1', '0');
    await animation.play();
    this.router.navigateByUrl('login');
  }
}
