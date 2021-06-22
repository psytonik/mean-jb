import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../models/category';

import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${environment.apiURL}/category`)
  }
  getCategoryById(id:string):Observable<Category>{
    return this.httpClient.get<Category>(`${environment.apiURL}/category/${id}`)
  }
  createCategory(category:Category):Observable<Category>{
    return this.httpClient.post<Category>(`${environment.apiURL}/category`,category)
  }
  updateCategory(category:Category,id:any):Observable<Category>{
    return this.httpClient.put<Category>(`${environment.apiURL}/category/${id}`,category)
  }
  deleteCategory(id:string):Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiURL}/category/${id}`)
  }

}
