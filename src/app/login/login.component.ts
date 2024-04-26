import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';

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


  constructor(
    private router: Router,
    private fb: FormBuilder,
    // public authService: AuthService,
     private apiService: ApiService, 
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }



  async onSubmit() {   
    this.submitted = true;
    if (this.registerForm.value.email != '' && this.registerForm.value.password != '') {
        let _this=this
       this.apiService.getAccessToken(this.registerForm.value.email,this.registerForm.value.password).subscribe({
        next: async (response: any) => {
          localStorage.setItem("access-token",response);         
          localStorage.setItem("email",this.registerForm.value.email);         
          _this.router.navigate(['/reports','9c35b38b-b414-42ac-9e24-cbab01a9b1e2','ReportSection']);
        },error:async (response: any) => {
          _this.msg = 'Invalid Username / Password.'
          
        }
      });
      
    }
    else
      this.msg = 'Invalid Username / Password.'
  }
}
