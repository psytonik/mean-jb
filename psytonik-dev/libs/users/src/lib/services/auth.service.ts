import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environments";
import { LocalStorageService } from "./local-storage.service";
import { Router } from "@angular/router";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router) {}

  login(email:string,password:string):Observable<any>{
    return this.httpClient.post<any>(`${environment.apiURL}/users/login`,{email,password})
  }
  registration(user:User):Observable<User>{
    return this.httpClient.post<User>(`${environment.apiURL}/users/registration`,user)
  };
  logOut():void{
    this.router.navigate(['/login']).then(r=>r);
    return this.localStorageService.removeToken();
  }
  isAuthenticated(): boolean{
    return !!this.localStorageService.getToken();
  }
}
