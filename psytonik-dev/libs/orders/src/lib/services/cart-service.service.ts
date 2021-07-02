import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart";

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartSubscription: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  initCartLocalStorage() {
    const cart:Cart = this.getCart();
    if (!cart) {
      const initialCart = {
        items: []
      };
      const initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY, initialCartJson);
    }
  }
  emptyCart():void{
    const initialCart:Cart = {
      items: []
    };
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem(CART_KEY, initialCartJson);
    this.cartSubscription.next(initialCart);
  }

  getCart():Cart {
    const cartJsonString: any = localStorage.getItem(CART_KEY);
    return JSON.parse(cartJsonString);
  }

  setCartItem(cartItem:CartItem,updateCartItem?:boolean):Cart {
    const cart = this.getCart();
    const cartItemExist = cart?.items?.find((item:CartItem)=> item.productId === cartItem.productId);
    if(cartItemExist){
      cart?.items?.map((item:any) => {
        if(item.productId === cartItem.productId){
          if(updateCartItem){
            item.quantity = cartItem.quantity;
          } else {
            item.quantity += cartItem.quantity;
          }
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

  deleteCartItem(productId:string){
    const cart = this.getCart();
    cart.items = cart.items?.filter(item => item.productId !== productId);

    const cartString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY,cartString);
    this.cartSubscription.next(cart);
    return cart;
  }
}
