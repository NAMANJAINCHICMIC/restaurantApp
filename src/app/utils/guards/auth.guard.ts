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

    if ((path?.includes('home') || path?.includes('change-password') || path?.includes('menu')|| path?.includes('my-cart')|| path?.includes('orders')|| path?.includes('view-profile')|| path?.includes('update-profile'))&& !this.authService.isNotLoggedIn()) {
      return true;
    }
    if ( ( path?.includes('add-food')|| path?.includes('add-chef'))&& !this.authService.isNotLoggedIn() && (this.authService.userRole === 'admin') ){
      return true;
    }
    if ((path?.includes('sign-up') || path?.includes('sign-in')) && !this.authService.isNotLoggedIn()) {
      this.router.navigate(['home']);
      return false; 
    }
    if ((path?.includes('sign-up') || path?.includes('sign-in')) && this.authService.isNotLoggedIn()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
