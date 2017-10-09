import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { config } from '../config'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    private user: UserService,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  canActivate () {
    if (this.user.isLoggedIn()) {
      if (this.user.user) {
        return true
      } else {
        return this.http.get(config.oauth_me_url).toPromise().then((response) => {
          this.user.user = response['email']
          return true
        })
      }
    } else {
      let token = localStorage.getItem('token')
      if (token) {
        return this.user.login(token).then(() => true).catch(() => {
          this.notifyAndRedirect()
          false
        })
      } else {
        this.notifyAndRedirect()
        return false
      }
    }
  }

  notifyAndRedirect () {
    this.user.error = {
      message: 'Vous devez vous authentifier pour accèder à cette page'
    }
    this.router.navigate(['/connexion'])
  }
}
