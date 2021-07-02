import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { CartServiceService } from "../../services/cart-service.service";
import { OrdersService } from "../../services/orders.service";

@Component({
  selector: 'orders-cart-summary',
  templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent implements OnInit, OnDestroy {

  endSubs$: Subject<any> = new Subject();
  totalPrice!:number;
  isCheckOut = false;
  constructor(
    private cartService: CartServiceService,
    private orderService:OrdersService,
    private router:Router
  ) {
    this.router.url.includes('checkout') ? (this.isCheckOut = true) :  (this.isCheckOut = false);
  }

  ngOnInit(): void {
    this._getOrderSummary()
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
  navigateToCheckOut(){
    this.router.navigate(['/checkout']).then(r=>r);
  }

  private _getOrderSummary() {
    this.cartService.cartSubscription
      .pipe(takeUntil(this.endSubs$))
      .subscribe((cart)=>{
        this.totalPrice = 0;
        if (cart) {
          cart?.items?.map((item:any)=>{
            this.orderService
              .getProductById(item.productId)
              .pipe(take(1))
              .subscribe(product=>{
                this.totalPrice += product.price * item.quantity
              })
          })
        }
      })
  }
}
