import { Component, OnInit,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import {SignUpComponent} from '../auth/sign-up/sign-up.component'

@Component({
  selector: 'app-headder',
  templateUrl: './headder.component.html',
  styleUrls: ['./headder.component.scss']
})
export class HeadderComponent implements OnInit, DoCheck {
  isLogin:boolean=false;
  constructor(private auth:AuthServiceService,private router:Router) { }

  ngOnInit(){
    this.auth.user.subscribe(user=>{
      this.isLogin= !user? false: true;
    })
  }
  ngDoCheck(){
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.auth.user.subscribe(user=>{
      this.isLogin= !user? false: true;
    })
  }
  signOut(){
    console.log("You are LogOut");
    this.auth.logout();
  }
  SignIn(){
    this.router.navigate(['/']);
    console.log("You are LogIn");
  }

}
