import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    private user: UserService,
    private router: Router
  ) {}

  canActivate () {
    const token = this.user.getToken()
    if (token) {
      return true
    } else {
      this.router.navigate(['/accueil'])
      return false
    }
  }
}
