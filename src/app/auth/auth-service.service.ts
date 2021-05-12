import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject,Observable } from 'rxjs';
import{ tap } from 'rxjs/operators';
import { authModel } from './auth-model';
import { stringify } from '@angular/compiler/src/util';
import { environment } from 'src/environments/environment';

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
  initialUserDetails: User=new User(null,null,null,null);
  private userDetailsSource: BehaviorSubject<User> = new BehaviorSubject<User>(this.initialUserDetails);

public userDetailsObservable: Observable<User> = this.userDetailsSource.asObservable();

 //user  =new Subject<User>();
  setUserDetails(userDetails: User) {
    this.userDetailsSource.next(userDetails);
  }
  getUserDetails(): Observable<User> {
    return this.userDetailsObservable;
   }
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
                                                                 
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebase.apiKey,
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
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebase.apiKey,
    {
      email:auth.email,
      password:auth.password,
      returnSecureToken:true
    }).pipe(tap(resdata=>{
      console.log("all Auth");
      this.handleAuthentication(resdata.email,resdata.localId,resdata.idToken,+resdata.expiresIn)
  }))
  }

  private handleAuthentication(email: string,localId:string,idToken,expiresIn:number){
    const expairDate=new Date(new Date().getTime() + expiresIn * 1000);
      const user =new User(email,localId,idToken,expairDate);
      this.setUserDetails(user);
      localStorage.setItem('userData',JSON.stringify(user));
      
      console.log("user Object Created");
      this.router.navigate(['Admin/home']);
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
      if(loadedData!=null){
        console.log(loadedData);
      console.log("data Emmit");
      //this.user.next(loadedData);
      this.setUserDetails(loadedData);
      }
      
    }
    else{
      console.log("data Not Emmit");
    }

  }
  logout(){
    console.log("user clear");
        this.setUserDetails(null);
        localStorage.removeItem('userData');
        localStorage.removeItem('VUserData');
        this.router.navigate(['login']);
  }

}
