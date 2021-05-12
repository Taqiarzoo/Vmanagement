import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { person } from 'src/app/sheared/person.model';
import { authModel } from '../auth-model';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  login=false;
  error=null;
  @ViewChild('f') signupForm: NgForm;
  auth: authModel=new authModel();
  constructor(private authService:AuthServiceService) { }
  ngOnInit(): void {
    
  }
  
  onSubmit()
  {
    {
      this.auth.email= this.signupForm.value.email;
      this.auth.name= this.signupForm.value.Fullname;
      this.auth.contact= this.signupForm.value.contact;
      this.auth.aadhar= this.signupForm.value.aadhar;
      this.auth.password= this.signupForm.value.password;
    }
    if(!this.signupForm.valid){
      return;
    }else{
      console.log(this.auth);
      this.authService.signUp(this.auth).subscribe(subsData=>{
        console.log(subsData);
      },errorData=>{
        if(errorData.error.error.message=='EMAIL_EXISTS'){
          this.error="Email already Exist";
        }else
        this.error="Unknown Error Occured!"
        console.log(errorData);
      });
    }
    
  }

}
