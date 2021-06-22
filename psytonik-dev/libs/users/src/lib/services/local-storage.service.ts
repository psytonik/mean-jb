import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken'
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  setToken(data:any){
    return localStorage.setItem(TOKEN,data);
  }
  getToken(){
    return localStorage.getItem(TOKEN)
  }
  removeToken(){
    return localStorage.removeItem(TOKEN)
  }

}
