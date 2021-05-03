import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth:AuthServiceService,private rout:Router) { }
  canActivate
  (
    route: ActivatedRouteSnapshot, 
    router:RouterStateSnapshot
  ): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree{
    return this.auth.user.pipe(map(user=>{
      console.log("its Auth Guard");
      const login= !!user;
      if(login){
        return true;
      }else{
        return this.rout.createUrlTree(['/'])
      }
    }))
  }
}
