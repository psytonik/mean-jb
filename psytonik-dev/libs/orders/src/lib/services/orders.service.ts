import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "environments/environments";
import { Observable } from "rxjs";
import { Order } from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }

  getOrders():Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${environment.apiURL}/orders`);
  }
  getOrder(id:string):Observable<Order>{
    return this.httpClient.get<Order>(`${environment.apiURL}/orders/${id}`)
  }
  createOrder(order:Order):Observable<Order>{
    return this.httpClient.post<Order>(`${environment.apiURL}/orders`,order)
  }
  updateOrder(orderStatus: { status:string },id:string):Observable<Order>{
    return this.httpClient.put<Order>(`${environment.apiURL}/orders/${id}`,orderStatus)
  }
  deleteOrder(id:string):Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiURL}/orders/${id}`)
  }
  totalTotalSales():Observable<any>{
    return this.httpClient.get<any>(`${environment.apiURL}/orders/get/totalsales`)
  }
  getTotalOrders():Observable<any>{
    return this.httpClient.get<any>(`${environment.apiURL}/orders/get/counts`)
  }
  getProductById(id:string):Observable<any>{
    return this.httpClient.get<any>(`${environment.apiURL}/products/${id}`)
  }
}
