import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import {  Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = true;
  public sidebarToggled = true;
  public userDetails={email:"",role:""}
  constructor(config: NgbDropdownConfig, private authService: MsalService) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
     this.userDetails.email=localStorage.email;
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }
  home() {

    const myElement = document.getElementById("submenu00");
    myElement.click();
  }

  logout() {
    localStorage.removeItem('access-token')
    this.authService.logoutRedirect();
  }
}
