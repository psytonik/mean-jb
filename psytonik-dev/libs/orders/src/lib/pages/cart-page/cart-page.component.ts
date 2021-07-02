import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CartServiceService } from "../../services/cart-service.service";
import { OrdersService } from "../../services/orders.service";


@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit,OnDestroy {

  cartItemDetailed: any[] = [];
  cartCount = 0;
  endSubs$ :Subject<any> = new Subject();

  constructor(
    private router:Router,
    private cartService:CartServiceService,
    private ordersService:OrdersService
  ) { }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete()
  }

  ngOnInit(): void {
    this._getCartDetails();
  }

  updateCartItemQuantity(event:any, cartItem:any){
    this.cartService.setCartItem({
        productId: cartItem.product.id,
        quantity: event.value
    },true)
  }

  private _getCartDetails() {
    this.cartService.cartSubscription.pipe(takeUntil(this.endSubs$))
      .subscribe((data:any)=>{
      this.cartItemDetailed = [];
      this.cartCount = data?.items?.length ?? 0;
      data.items?.forEach(
        (cartItem:any)=>{
        this.ordersService.getProductById(cartItem.productId)
          .subscribe((responseProducts:any)=>{
            return this.cartItemDetailed.push({ product:responseProducts,quantity:cartItem.quantity });
        });

      })
    });
  }
  backToShop(){
    this.router.navigate(['/products']).then(r=>r);
  }
  deleteProductFromCart(cartItem:any){
    this.cartService.deleteCartItem(cartItem.product.id)
  }
}
