import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authModel } from '../auth-model';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  auth: authModel=new authModel();
  error:string=null;
  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
  }
  onSubmit(f:NgForm){
    if(!f.form.valid){
      return
    }
    this.auth.email=f.form.value.email;
    this.auth.password=f.form.value.password;
    this.authService.logIn(this.auth).subscribe(subsData=>{
      console.log(subsData);
      
    },errorData=>{
      if(errorData.error.error.message=='EMAIL_NOT_FOUND' || errorData.error.error.message=='INVALID_PASSWORD' ){
        this.error="INVALID EMAIL OR PASSWORD";
      }else
      this.error="Unknown Error Occured!"
      console.log(errorData);
    });
  }
}
