import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const token = sessionStorage.getItem('jwt');
    if (token) {
      const decodedToken: any = jwt_decode(token);

      if (decodedToken.role === 'admin') {
        return true;
      } else {
        swal('Sorry!', 'You need to be logged in as an admin', 'error');
        return this.router.parseUrl('/login');
      }
    } else {
      swal('Sorry!', 'You need to be logged in', 'error');
      return this.router.parseUrl('/login');
    }
  }
}
