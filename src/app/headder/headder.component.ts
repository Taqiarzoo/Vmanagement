import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import {SignUpComponent} from '../auth/sign-up/sign-up.component'

@Component({
  selector: 'app-headder',
  templateUrl: './headder.component.html',
  styleUrls: ['./headder.component.scss']
})
export class HeadderComponent implements OnInit {
  isLogin:boolean=false;
  constructor(private auth:AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user=>{
      console.log('IN Subscription');
      console.log(user.email);
      this.isLogin= !user? false: true;
      console.log('IN Subscription'+this.isLogin);
    })
  }
  signOut(){
    console.log("You are LogOut");
    this.auth.logout();
  }
  SignIn(){
    this.router.navigate(['login']);
    console.log("You are LogIn");
  }

}
