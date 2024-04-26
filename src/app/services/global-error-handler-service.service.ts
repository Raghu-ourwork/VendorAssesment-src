import {  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {  Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {Observable,throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import { ApiService } from './api.service';
@Injectable()
export class GlobalErrorHandlerService implements HttpInterceptor {

    constructor(private authService: ApiService) {
    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        if(error.status==401){
          this.authService.logoutUser();
        }
        else  if(error.status==400){
          return throwError(error);
        }
        
        return throwError(error.message);
      })
    )
  }
}
