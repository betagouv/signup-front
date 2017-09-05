import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../subscription/subscription.service'

@Component({
  selector: 'app-public-mission-form',
  templateUrl: './public-mission-form.component.html',
  styleUrls: ['./public-mission-form.component.css']
})
export class PublicMissionFormComponent implements OnInit {

  constructor(
    public subscription: SubscriptionService
  ) { }

  ngOnInit() {
  }

}
