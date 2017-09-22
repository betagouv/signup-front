import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    private user: UserService,
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate () {
    if (this.user.isLoggedIn()) {
      return true
    } else {
      this.user.errors = {
        errors: [
          {
            detail: 'vous devez vous authentifier pour accèder à cette page'
          }
        ]
      }
      this.router.navigate(['/connexion'])
      return false
    }
  }
}
