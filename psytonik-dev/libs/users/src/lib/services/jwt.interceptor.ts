import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

import { LocalStorageService } from "./local-storage.service";
import { environment } from "@env/environments";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

  constructor(
    private router: Router,
    private localStorage:LocalStorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorage.getToken();
    const isApiUrl = req.url.startsWith(environment.apiURL);
    if(token && isApiUrl){
      req = req.clone({
        setHeaders: {
          Authorization:`Bearer ${token}`
        }
      })
    }
    return next.handle(req)
  }


}
