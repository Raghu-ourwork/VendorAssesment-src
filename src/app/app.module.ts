import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { CompanyDimensionDetailsComponent } from './company-dimension-details/company-dimension-details.component';
import { BandValuesComponent } from './band-values/band-values.component';
import { BandValueUpdateComponent } from './band-value-update/band-value-update.component'
import { ChatbotComponent } from './chatbot/chatbot.component';




// Required for MSAL
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { CodeComponent } from './code/code.component';
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      // 'Application (client) ID' of app registration in the Microsoft Entra admin center - this value is a GUID
      clientId: "263c85cc-4f0a-43ae-9a65-a8b5ec1ea19f",
      // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
      authority: "https://login.microsoftonline.com/8550cca8-1055-4258-ad3b-ee3cca0ef462",
      // Must be the same redirectUri as what was provided in your app registration.
      redirectUri: "https://gray-cliff-09c86f80f.5.azurestaticapps.net/#/",
      // redirectUri: "http://localhost:60467",
      navigateToLoginRequestUrl:false
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE
    }
  });
}
// MSAL Interceptor is required to request access tokens in order to access the protected resource (Graph)
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

// MSAL Guard is required to protect routes and require authentication before accessing protected routes
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ContentAnimateDirective,
    LoginComponent,
    ReportsComponent,
    CompanyDimensionDetailsComponent,
    BandValuesComponent,
    BandValueUpdateComponent,
    ChatbotComponent,
    CodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatCardModule, MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MsalModule
  ],
  providers: [ {
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  {
    provide: MSAL_GUARD_CONFIG,
    useFactory: MSALGuardConfigFactory
  },
  {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: MSALInterceptorConfigFactory
  },
  MsalService,
  MsalGuard,
  MsalBroadcastService
],
bootstrap: [AppComponent, MsalRedirectComponent]
 
})
export class AppModule { }




