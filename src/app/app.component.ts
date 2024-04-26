import { Component, Inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';


import { Subject } from 'rxjs';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo1';
  tokenExpiration: string = '';
  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  isLoading: boolean;
  private readonly _destroying$ = new Subject<void>();

  constructor(private router: Router,private apiService:ApiService) {
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        var resetpasswordUrl = event['url'].split('/')[1];
        
        if ((event['url'] == '/') || (event['url'] == '/logout') || (event['url'] == '/forgotpassword') || (resetpasswordUrl == 'ResetPassword')) {
          this.showSidebar = false;
          this.showNavbar = false;
          this.showFooter = false;
          document.querySelector('.main-panel').classList.add('w-100');
          document.querySelector('.main-panel').classList.add('ml-0');
        } else if(localStorage.getItem('access-token') != null && localStorage.getItem('email')!=null){
          this.showSidebar = true;
          this.showNavbar = true;
          this.showFooter = true;
          document.querySelector('.main-panel').classList.remove('w-100');
          document.querySelector('.main-panel').classList.remove('ml-0');
          // document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
          document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
          document.querySelector('.content-wrapper').classList.remove('p-0');
        }
      }
    });

    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }



  ngOnInit() {
    

    // this.login()
  }


  // Log the user in and redirect them if MSAL provides a redirect URI otherwise go to the default URI
 

  // Log the user out
  logout() {
    this.apiService.logoutUser();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
