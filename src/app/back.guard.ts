import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './shared/authentication-service';

@Injectable({
  providedIn: 'root',
})
export class BackGuard implements CanActivate {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (!(await this.authService.isLoggedInn())) {
      return true;
    } else {
      this.router.navigate(['/botones-principales']);
    }
  }
}
