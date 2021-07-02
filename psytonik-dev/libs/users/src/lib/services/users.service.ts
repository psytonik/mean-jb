import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environments";
import { User } from "../models/user";
import * as countriesList from "i18n-iso-countries";

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) {
    countriesList.registerLocale(require("i18n-iso-countries/langs/en.json"))
  }

  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${environment.apiURL}/users`)
  };

  getUser(id:string):Observable<User>{
    return this.httpClient.get<User>(`${environment.apiURL}/users/${id}`)
  };

  createUser(user:User):Observable<User>{
    return this.httpClient.post<User>(`${environment.apiURL}/users/`,user)
  };

  updateUser(user:User):Observable<User>{
    return this.httpClient.put<User>(`${environment.apiURL}/users/${user.id}`,user)
  };

  deleteUser(id:string):Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiURL}/users/${id}`)
  }

  getUsersCount():Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/users/get/users-count`)
  }

  getCountries() {
    return Object.entries(countriesList.getNames("en", {select: "official"}))
      .map((entry)=>{
      return {id:entry[0],name:entry[1]}
    })
  }

  getCountry(countryKey: string): string {
    return countriesList.getName(countryKey, 'en');
  }
}
