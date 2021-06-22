import {OrderItem} from '@psytonik-dev/orders';
import {User} from '@psytonik-dev/users'

export interface Order {
  name?:string,
  id?:string,
  orderItems?:OrderItem,
  status?:number,
  shippingAddress1?:string,
  shippingAddress2?:string,
  city?:string,
  zip?:string,
  country?:string,
  phone?:string,
  totalPrice?:string,
  user?:User,
  dateOrdered?:string
}
