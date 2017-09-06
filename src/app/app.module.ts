import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-popover';

import { AuthGuard } from './guards/auth.guard'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PublicMissionFormComponent } from './public-mission-form/public-mission-form.component';

import { SubscriptionService } from './subscription/subscription.service';
import { UserService } from './user/user.service'
import { EnrollmentService } from './enrollment/enrollment.service'

import { FranceConnectedFormComponent } from './france-connected-form/france-connected-form.component';
import { FranceConnectLoginFormComponent } from './france-connect-login-form/france-connect-login-form.component';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component'

const routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  { path: 'accueil', component: HomeComponent },
  { path: 'souscription', component: SubscriptionComponent },
  { path: 'enrollement', component: EnrollmentFormComponent, canActivate: [AuthGuard] }
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubscriptionComponent,
    PublicMissionFormComponent,
    FranceConnectedFormComponent,
    FranceConnectLoginFormComponent,
    EnrollmentFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PopoverModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  providers: [
    SubscriptionService,
    UserService,
    EnrollmentService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
