import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-popover';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule } from 'angular2-datatable';

import { AuthGuard } from './guards/auth.guard'
import { EnrollmentResolver } from './resolvers/enrollment.resolver'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PublicMissionFormComponent } from './public-mission-form/public-mission-form.component';

import { SubscriptionService } from './subscription/subscription.service';
import { UserService } from './user/user.service'
import { AuthService } from './auth/auth.service'
import { MessageService } from './message/message.service'
import { EnrollmentService } from './enrollment/enrollment.service'
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor'

import { FranceConnectedFormComponent } from './france-connected-form/france-connected-form.component';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { LoginComponent } from './login/login.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { OauthCallbackComponent } from './oauth-callback/oauth-callback.component';
import { EnrollmentsTableComponent } from './enrollments-table/enrollments-table.component';
import { MessageComponent } from './message/message.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { MessagesComponent } from './messages/messages.component';
import { SeasonalitySlotComponent } from './seasonality-slot/seasonality-slot.component'

const routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomeComponent },
  { path: 'souscription', component: SubscriptionComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'oauth-callback/:token', component: OauthCallbackComponent },
  { path: 'enrolements/form', component: EnrollmentFormComponent, canActivate: [AuthGuard] },
  { path: 'enrolements/new', component: EnrollmentComponent, canActivate: [AuthGuard] },
  { path: 'enrolements/:id', component: EnrollmentComponent, canActivate: [AuthGuard] },
  { path: 'enrolements/:id/edit', component: EnrollmentFormComponent, canActivate: [AuthGuard], resolve: {
    enrollment: EnrollmentResolver
  } },
  { path: 'enrolements', component: EnrollmentsComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubscriptionComponent,
    PublicMissionFormComponent,
    FranceConnectedFormComponent,
    EnrollmentFormComponent,
    EnrollmentComponent,
    LoginComponent,
    EnrollmentsComponent,
    OauthCallbackComponent,
    EnrollmentsTableComponent,
    MessageComponent,
    MessageFormComponent,
    MessagesComponent,
    SeasonalitySlotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PopoverModule,
    BrowserAnimationsModule,
    DataTableModule,
    RouterModule.forRoot(
      routes,
      {
        useHash: true
      }
    ),
    HttpClientModule
  ],
  providers: [
    HttpClient,
    SubscriptionService,
    UserService,
    AuthService,
    MessageService,
    EnrollmentService,
    AuthGuard,
    EnrollmentResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
