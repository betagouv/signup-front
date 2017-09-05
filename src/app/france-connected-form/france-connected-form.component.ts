import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription/subscription.service'

@Component({
  selector: 'app-france-connected-form',
  templateUrl: './france-connected-form.component.html',
  styleUrls: ['./france-connected-form.component.css']
})
export class FranceConnectedFormComponent implements OnInit {

  constructor(
    public subscription: SubscriptionService
  ) { }

  ngOnInit() {
  }

}
