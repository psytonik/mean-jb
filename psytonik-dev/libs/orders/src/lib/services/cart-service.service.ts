import {Injectable} from '@angular/core';
import {Cart, CartItem} from '@psytonik-dev/orders';
import { BehaviorSubject } from 'rxjs';

export const CART_KEY:string = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartSubscription: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initCartLocalStorage() {
    const cart:Cart = this.getCart();
    if (!cart) {
      const initialCart = {
        items: []
      };
      let initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY, initialCartJson);
    }
  }

  getCart():Cart {
    const cartJsonString: any = localStorage.getItem(CART_KEY);
    return JSON.parse(cartJsonString);
  }

  setCartItem(cartItem:CartItem):Cart {
    const cart = this.getCart();
    const cartItemExist = cart?.items?.find((item)=> item.productId === cartItem.productId);
    if(cartItemExist){
      cart?.items?.map((item:any) => {
        if(item.productId === cartItem.productId){
          item.quantity += cartItem.quantity;
          return item;
        }
      })
    } else {
      cart?.items?.push(cartItem);
    }
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY,cartJson);
    this.cartSubscription.next(cart);
    return cart;
  }

}
