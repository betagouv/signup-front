import { Injectable, ReflectiveInjector } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    const headers = req.headers
      .set('X-Oauth-Provider', localStorage.getItem('authType'))
      .set('Authorization', 'Bearer ' + token)
    const authReq = req.clone(
      {
        headers: headers
      }
    )
    return next.handle(authReq).map((response) => {
      if (
        (response instanceof HttpErrorResponse) &&
        response.status == 401
      ) {
        localStorage.removeItem('token')
        this.router.navigate(['/connexion'])
      }
      return response
    })
  }
}
