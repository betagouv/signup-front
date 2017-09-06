import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-france-connect-login-form',
  templateUrl: './france-connect-login-form.component.html',
  styleUrls: ['./france-connect-login-form.component.css']
})
export class FranceConnectLoginFormComponent implements OnInit {
  error: string;

  constructor(
    public user: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.user.login().then((response) => {
      this.error = null
      this.router.navigate(['/enrollement'])
    }).catch((response) => {
      this.error = response.errors[0].detail
    })
  }
}
