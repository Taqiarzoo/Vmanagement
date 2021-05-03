import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import{ tap } from 'rxjs/operators';
import { authModel } from './auth-model';
import { stringify } from '@angular/compiler/src/util';

interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?:boolean;
}
export class User{
  constructor(
    public email:string,
    public id: string,
    private _token:string,
    private _tokenExpairDate:Date,
  ){}
  get token(){
    if(!this._tokenExpairDate || new Date()>this._tokenExpairDate){
      return null;
    }
    return this._token;
  }

}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user =new Subject<User>();
  constructor( private httpClient:HttpClient,private router:Router) { }
  

  //http request to store data
  /*signUp(auth:authModel){
    this.httpClient
    .post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXCqIiOcZ8dY9QLFOM0XXilmYXQY_LA58',
      auth
    )
    .subscribe(responseData => {
      console.log(responseData);
    });
  }*/
  signUp(auth:authModel){
    return this.httpClient
    .post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXCqIiOcZ8dY9QLFOM0XXilmYXQY_LA58',
      {
        email:auth.email,
        password:auth.password,
        returnSecureToken:true
      }
    ).pipe(tap(resdata=>{
        console.log("Response Data"+resdata);
        this.handleAuthentication(resdata.email,resdata.localId,resdata.idToken,+resdata.expiresIn)
    }))
  }
  logIn(auth:authModel){
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXCqIiOcZ8dY9QLFOM0XXilmYXQY_LA58',
    {
      email:auth.email,
      password:auth.password,
      returnSecureToken:true
    }).pipe(tap(resdata=>{
      console.log("Response Data"+resdata);
      this.handleAuthentication(resdata.email,resdata.localId,resdata.idToken,+resdata.expiresIn)
  }))
  }

  private handleAuthentication(email: string,localId:string,idToken,expiresIn:number){
    const expairDate=new Date(new Date().getTime() + expiresIn * 1000);
      const user =new User(email,localId,idToken,expairDate);
      localStorage.setItem('userData',JSON.stringify(user));
      this.user.next(user);
      
      this.router.navigate(['/']);
  }
  //this function is responsible for auto login 
  //which prevent state lost on refresh it store user data into local storage
  //this function is call from appComponenet's OnInit() function because 
  //that component load first.
  autoLogin(){
    const userdata: {
        email:string;
        id: string;
        _token:string;
        _tokenExpairDate:Date;
    }=JSON.parse(localStorage.getItem('userData'));
    if(!userdata){
      return;
    }
    console.log("Auto Login Call");
    
    const loadedData=new User
    (
      userdata.email,
      userdata.id,
      userdata._token,
      new Date
      (
        userdata._tokenExpairDate
      )
    );
    if(loadedData.token){
      console.log(loadedData);
      this.user.next(loadedData);
    }

  }
  logout(){
    this.user.next(null);
    this.router.navigate(['login']);
  }

}
