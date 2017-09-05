import { Injectable } from '@angular/core';

@Injectable()
export class SubscriptionService {
  publicMission: string;
  franceConnected: string;
  constructor () {}

  isPublicMission () {
    return this.publicMission == 'true'
  }
  isFranceConnected () {
    return this.franceConnected == 'true'
  }
}
