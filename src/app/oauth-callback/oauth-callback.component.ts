import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.css']
})
export class OauthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private user: UserService
  ) {
    route.params.subscribe((params) => {
      return this.user.login(params['token']).then(() => {
        const destination = localStorage.getItem('afterLoginDestination') || ''
        localStorage.removeItem('afterLoginDestination')
        return router.navigate([destination])
      })
    })
  }

  ngOnInit() {
  }
}
