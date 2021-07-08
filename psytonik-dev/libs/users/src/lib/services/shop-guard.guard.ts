import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService, LocalStorageService } from "@psytonik-dev/users";

@Injectable({
  providedIn: 'root'
})
export class ShopGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService:LocalStorageService,
    private authService:AuthService
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isAuthenticated()){
      return true;
    } else {
      this.authService.logOut();
      this.router.navigate(['/login']).then(r=>r);
      return false;
    }

  }

}
