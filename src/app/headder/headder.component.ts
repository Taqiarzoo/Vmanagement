import { Component, OnInit,DoCheck, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import {SignUpComponent} from '../auth/sign-up/sign-up.component'

@Component({
  selector: 'app-headder',
  templateUrl: './headder.component.html',
  styleUrls: ['./headder.component.scss']
})
export class HeadderComponent implements OnInit,OnDestroy {
  userSub:Subscription;
  isLogin:boolean=false;
  constructor(private auth:AuthServiceService,private router:Router) { }

  ngOnInit(){
    
    this.auth.getUserDetails().subscribe(user => {
      if(user==null || user.token==null || user.id==null || user.email==null){
        this.isLogin=false;
      }else{
        this.isLogin=true;
      }
      
  })
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
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
