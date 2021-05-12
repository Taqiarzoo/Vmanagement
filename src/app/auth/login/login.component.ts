import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { authModel } from '../auth-model';
import { AuthServiceService } from '../auth-service.service';
import {map} from 'rxjs/operators';
import { DataServiceService } from 'src/app/services/data-service.service';
import { person } from 'src/app/sheared/person.model';
interface Iperson{
  aadharNo: number;
  eligibility?: boolean;
  name: string;
  age: number;
  vactnationStatus?:boolean;
  firstdose?:any;
  seconddose?:any;
  vaccine?: string;
  firstShot?: boolean;
  secondShot?:boolean;
  isSecondShot?: boolean;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  isloading:boolean=false;
  auth: authModel=new authModel();
  error:string=null;
  constructor(private dataservice:DataServiceService, private authService:AuthServiceService,private http:HttpClient) { }

  ngOnInit(): void {
  }
  onSubmit(f:NgForm){
    this.isloading=true;
    if(!f.form.valid){
      return
    }
    this.auth.email=f.form.value.email;
    this.auth.password=f.form.value.password;
    this.authService.logIn(this.auth).subscribe(subsData=>{
      console.log(subsData);
      this.isloading=false;
    },errorData=>{
      if(errorData.error.error.message=='EMAIL_NOT_FOUND' || errorData.error.error.message=='INVALID_PASSWORD' ){
        this.error="INVALID EMAIL OR PASSWORD";
      }else
      this.error="Unknown Error Occured!"
      console.log(errorData);
      this.isloading=false;
    });
  }
  update(){
   
    let aadharNo:number=2;
    return this.http.patch
    (
      'https://vmanagement-22ebf-default-rtdb.firebaseio.com/User/-M_AUIf1Pc2u7WHkbXOO/'+aadharNo+'.json',
      {
        name:"Ziya Fatima Arzoo",
        age:29,
        firstShot: true,
        secondShot: false

      }
    ).subscribe(responseData=>{
      console.log("data sussfully Updated");
    },error=>{
      console.log("aaat thu phir sai error");
    })
  }
  fetch(aadharNo:number){
    aadharNo=0;
    this.dataservice.check();
    // let searchParems=new HttpParams();
    // //searchParems=searchParems.append('child','\"-M_5UP3aA8mFMgPrv_fD\"');
    // searchParems=searchParems.append('orderBy','\"aadharNo\"');
    // searchParems=searchParems.append('equalTo','\"0\"');
    
    // return this.http.get<authModel>
    // (
    //   'https://vmanagement-22ebf-default-rtdb.firebaseio.com/User/-M_AUIf1Pc2u7WHkbXOO/'+aadharNo+'.json',
      
    // )
    
    // .subscribe
    // (
    //   users=>
    //   {
    //     console.log(users);
        
    //   },error=>{
    //     console.log(error);
        
    //     console.log("Error Occure");
    //   })
  }
  deleteData1(){
    this.dataservice.deleteDatabase();
  }
}
