import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { ApiService } from './services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,private apiService:ApiService) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {   
      if(localStorage.getItem('access-token') != null && localStorage.getItem('email')!=null)
      {
        return true;
      }
      else {
        this.apiService.logoutUser();
        return false;
      }
    }

}
