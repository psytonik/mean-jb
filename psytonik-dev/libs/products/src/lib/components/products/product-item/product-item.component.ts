import { Component, Input } from "@angular/core";
import { CartItem, CartServiceService } from "@psytonik-dev/orders";
import { Product } from "../../../models/product";


@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html'
})

export class ProductItemComponent {

  @Input() product!: Product;

  constructor(private cartService: CartServiceService) { }

  addProductToCart(){
    const cartItem:CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)
  }

}
