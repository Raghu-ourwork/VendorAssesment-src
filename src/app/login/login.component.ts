
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
// Required for MSAL
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';

// Required for RJXS
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  haserror: boolean;
  msg: string;
  registerForm: FormGroup;
  submitted = false;
  tokenExpiration: string = '';
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    // public authService: AuthService,
    private apiService: ApiService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) { }

  ngOnInit(): void {
    console.log(this.msalGuardConfig.authRequest)


    // this.apiService.getAccessToken('ionideademo@plateauinc.com', 'Ascendplane#3214').subscribe({
    //   next: async (response: any) => {
    //     localStorage.setItem("access-token", response);
    //   }, error: async (response: any) => {
    //   }
    // });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe((result) => {
        if (!this.authService.instance.getActiveAccount() && this.authService.instance.getAllAccounts().length > 0) {
          this.authService.instance.setActiveAccount(this.authService.instance.getAllAccounts()[0]);

          this.authService.acquireTokenSilent({
            scopes: ['https://analysis.windows.net/powerbi/api/.default'] // Define the scopes for your API
          }).subscribe({
            next: (result) => {
              localStorage.setItem('access-token', result.accessToken)
              localStorage.setItem('email', this.authService.instance.getActiveAccount()['username'])
              this.router.navigate(['/reports', '9c35b38b-b414-42ac-9e24-cbab01a9b1e2', 'ReportSection']);
            },
            error: (error) => {
              console.log('Error acquiring access token: ', error);
            }
          });
         
        } else {
          this.login()
        }
      });
  }


  async login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  // Log the user out
  logout() {
    localStorage.removeItem('access-token')
    this.authService.logoutRedirect();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
