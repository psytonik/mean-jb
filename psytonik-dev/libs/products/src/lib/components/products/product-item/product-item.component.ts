import { Component, Input, OnInit } from '@angular/core';
import {CartItem, CartServiceService } from '@psytonik-dev/orders';
import { Product } from '@psytonik-dev/products';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html'
})

export class ProductItemComponent implements OnInit {

  @Input() product!: Product;

  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {

  }
  addProductToCart(){
    const cartItem:CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)
  }

}
