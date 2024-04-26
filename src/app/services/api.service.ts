import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

  logoutUser() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("email");
    this.router.navigate(["/"]);
  }
  getReportDetails() {
    var reportDetails = {
      groupId: "cb283f47-dca8-4d9a-9220-ed6d0b71b6a4",
      reportId: "9c35b38b-b414-42ac-9e24-cbab01a9b1e2"
    }
    return reportDetails
  }
   getAccessToken(email,password){    
    let  body={email,password}   
    return   this.http.post("https://powerbi-access-token.azurewebsites.net/api/getAccessToken",body,{ responseType: 'text' })
   
  }
}
