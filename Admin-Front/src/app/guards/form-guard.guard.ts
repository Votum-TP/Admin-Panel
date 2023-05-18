import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormGuardGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.hasLogged()){
      return true;
    }  
    return confirm("Esta saliendo del proceso de registro de elección. Los cambios se perderán");
  }
  hasLogged(){
    var token =localStorage.getItem("token");
    if(token != null && token.length >0){
      return true;
    }
    return false;
  }
}
