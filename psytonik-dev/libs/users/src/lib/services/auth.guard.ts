import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService:LocalStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageService.getToken();
    if(token){
        // atob it javascript native function to decode token
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));

        if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
          return true
        }
      }
        this.router.navigate(['login']).then(r=>r);
        return false;

    }

  private _tokenExpired(expiration:any):boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

}
