import { Component, OnInit } from '@angular/core';

import { SubscriptionService } from '../subscription/subscription.service'

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  constructor(
    public subscription: SubscriptionService
  ) { }

  ngOnInit() {
  }

  showPublicMissionFail() {
    return this.subscription.publicMission && !this.subscription.isPublicMission()
  }
  showFranceConnectedForm() {
    return this.subscription.publicMission && this.subscription.isPublicMission()
  }
  showFranceConnectedFail() {
    return this.showFranceConnectedForm() &&
      this.subscription.franceConnected &&
      !this.subscription.isFranceConnected()
  }
  showFranceConnectLoginForm() {
    return this.showFranceConnectedForm() &&
      this.subscription.franceConnected &&
      this.subscription.isFranceConnected()
  }
}
