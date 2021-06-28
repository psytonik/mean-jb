import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'environments/environments';
import {Product} from '../models/product'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }

  getProducts(categoriesFilter?: string[]):Observable<Product[]>{
    let params = new HttpParams();
    if(categoriesFilter){
      params = params.append('categories',categoriesFilter.join(','));
    }
    return this.httpClient.get<Product[]>(`${environment.apiURL}/products`,{params:params})
  }

  createProduct(productData:FormData):Observable<Product>{
    return this.httpClient.post<Product>(`${environment.apiURL}/products`,productData)
  }

  updateProduct(productData:FormData,id:string):Observable<Product>{
    return this.httpClient.put<Product>(`${environment.apiURL}/products/${id}`,productData)
  }

  getProductById(id:string):Observable<Product>{
    return this.httpClient.get<Product>(`${environment.apiURL}/products/${id}`)
  }

  deleteProduct(id:string):Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiURL}/products/${id}`)
  }
  getTotalProducts():Observable<any>{
    return this.httpClient.get<any>(`${environment.apiURL}/products/get/count`)
  }
  getFeaturedProducts(count:number):Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${environment.apiURL}/products/get/featured/${count}`)
  }
}
