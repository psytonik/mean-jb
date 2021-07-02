import { Injectable } from "@angular/core";

const TOKEN = 'jwtToken';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setToken(data:any){
    return localStorage.setItem(TOKEN,data);
  }
  getToken():string | null {
    return localStorage.getItem(TOKEN)
  }
  removeToken():void{
    return localStorage.removeItem(TOKEN)
  }

}
