import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';




@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const { routeConfig } = route;
    const { path } = routeConfig as Route;

    if ((path?.includes('home') || path?.includes('change-password'))&& !this.authService.isLoggedIn()) {

      return true;
    }
    if ((path?.includes('sign-up') || path?.includes('sign-in')) && !this.authService.isLoggedIn()) {

 
      this.router.navigate(['home']);
      return false;
  
    }
    if ((path?.includes('sign-up') || path?.includes('sign-in')) && this.authService.isLoggedIn()) {

      return true;

    }


    this.router.navigate(['/']);

    return false;

  }

}
