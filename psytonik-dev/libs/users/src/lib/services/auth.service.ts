import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'environments/environments';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) {}

  login(email:string,password:string):Observable<any>{
    return this.httpClient.post<any>(`${environment.apiURL}/users/login`,{email,password})
  }
  logOut():any{
    this.router.navigate(['/login'])
    return this.localStorageService.removeToken();

  }
}
