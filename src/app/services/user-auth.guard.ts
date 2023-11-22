import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem('jwt');

    if (token) {
      return true; // Allow access if a token exists
    } else {
      swal('Sorry!', 'You need to be logged in', 'error');
       this.router.parseUrl('/login');
    }
  }
}
