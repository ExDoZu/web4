import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {
    }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
      return this.checkLogin();
    }
  
    checkLogin(): true | UrlTree {
      console.log("auth guard checking")
      if (this.userService.isLoggedIn()) {
        return true;
      }

  
      // Redirect to the login page
      return this.router.parseUrl('/login');
    }
  }