import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: any;
  @Input() destination: string;

  constructor(
    public user: UserService,
    public auth: AuthService,
    private router: Router
  ) {
    this.destination = this.destination || 'enrolements'
  }

  ngOnInit() {
    localStorage.setItem('afterLoginDestination', this.destination)
  }
}
