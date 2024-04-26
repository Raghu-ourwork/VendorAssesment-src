import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { ReportsComponent } from './reports/reports.component';
import { LoginComponent } from './login/login.component';
import { CompanyDimensionDetailsComponent } from './company-dimension-details/company-dimension-details.component';
import { BandValueUpdateComponent } from './band-value-update/band-value-update.component'
import { BandValuesComponent } from './band-values/band-values.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },

  {path: 'chatbot', component: ChatbotComponent, canActivate: [AuthGuardService]},
  {path: 'reports/:reportName/:sectionName', component: ReportsComponent, canActivate: [AuthGuardService]},
  {path: 'band-value', component: BandValueUpdateComponent, canActivate: [AuthGuardService]},
  {path: 'master-data', component: CompanyDimensionDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'module', component: BandValuesComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
