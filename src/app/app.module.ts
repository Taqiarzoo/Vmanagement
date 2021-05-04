import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {VaccineService} from './vaccine.service';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayComponent } from './GetVaccine/display/display.component';
import { SubHeaderComponent } from './Statistic/sub-header/sub-header.component';
import { StatisticComponent } from './Statistic/statistic/statistic.component';
import { TotalVaccinatedComponent } from './Statistic/total-vaccinated/total-vaccinated.component';
import { UnvaccinatedComponent } from './Statistic/unvaccinated/unvaccinated.component';
import { AvailableDosesComponent } from './Statistic/available-doses/available-doses.component';
import { VaccineComponent } from './Vaccine/vaccine/vaccine.component';
import { GetVaccineComponent } from './GetVaccine/get-vaccine/get-vaccine.component';
import { HeadderComponent } from './headder/headder.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CanActivate } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { from } from 'rxjs';
import { AuthGuardService } from './auth/authGuard.service';
import { AuthServiceService } from './auth/auth-service.service';
const routes:Routes=[
  {path: '',component: LoginComponent},
  {path: 'home', component: GetVaccineComponent},
  {path: 'Statistic', component: StatisticComponent},
  {path: 'vaccine', component: VaccineComponent},
  {path: 'signup',component: SignUpComponent},
  {path: '**', component: LoginComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    SubHeaderComponent,
    StatisticComponent,
    TotalVaccinatedComponent,
    UnvaccinatedComponent,
    AvailableDosesComponent,
    VaccineComponent,
    GetVaccineComponent,
    HeadderComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [VaccineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
