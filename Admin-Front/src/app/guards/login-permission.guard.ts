import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginPermissionGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.hasLogged()){
      return true;
    }  
    alert("No posee permisos ");
    return false
  }
  
  hasLogged(){
    var token =localStorage.getItem("token");
    if(token != null && token.length >0){
      return true;
    }
    return false;
  }
}
