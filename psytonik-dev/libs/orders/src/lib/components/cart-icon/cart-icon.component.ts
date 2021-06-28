import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '@psytonik-dev/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html'
})
export class CartIconComponent implements OnInit {

  cartCount:any = 0;

  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.cartService.cartSubscription.subscribe((cart)=>{
                       /// if nothing in cart ?? => return 0
      this.cartCount = cart?.items?.length ?? 0;
    })
  }

}
