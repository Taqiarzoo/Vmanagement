import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private auth:AuthServiceService){}
  title = 'VManagement';
  ngOnInit(){
    console.log("Auto Login Calll");
    this.auth.autoLogin();
  }
}
