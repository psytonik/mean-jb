import { OrderItem } from "./order-item";

export interface Order {
  name?:string,
  id?:string,
  orderitems?:OrderItem[],
  status?:number,
  shippingAddress1?:string,
  shippingAddress2?:string,
  city?:string,
  zip?:string,
  country?:string,
  phone?:string,
  totalPrice?:string,
  user?:any,
  dateOrdered?:string
}

export interface Country {
  id:string,
  name:string
}
