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
      this.isLogin= !user? false: true;
    })
  }
  signOut(){
    console.log("You are LogOut");
    this.auth.user.unsubscribe();
  }
  SignIn(){
    this.router.navigate(['login']);
    console.log("You are LogIn");
  }

}
