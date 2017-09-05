import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PublicMissionFormComponent } from './public-mission-form/public-mission-form.component';

import { SubscriptionService } from './subscription/subscription.service';
import { FranceConnectedFormComponent } from './france-connected-form/france-connected-form.component';
import { FranceConnectLoginFormComponent } from './france-connect-login-form/france-connect-login-form.component'

const routes = [
  {path: '', redirectTo: '/acueuil', pathMatch: 'full'},
  { path: 'acueuil', component: HomeComponent },
  { path: 'souscription', component: SubscriptionComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubscriptionComponent,
    PublicMissionFormComponent,
    FranceConnectedFormComponent,
    FranceConnectLoginFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  providers: [
    SubscriptionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
