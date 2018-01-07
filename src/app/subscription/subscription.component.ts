import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SubscriptionService } from '../subscription/subscription.service'
import { slideInOutAnimation } from '../animations/main'

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  constructor(
    public subscription: SubscriptionService,
    public auth: AuthService
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
