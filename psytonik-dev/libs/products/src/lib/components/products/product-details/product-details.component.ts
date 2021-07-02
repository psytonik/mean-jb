import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartItem, CartServiceService } from "@psytonik-dev/orders";

import { Subscription } from "rxjs";
import { Product } from "../../../models/product";
import { ProductsService } from "../../../services/products.service";

@Component({
  selector: 'products-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit,OnDestroy {

  product!:Product;
  currentProductId = '';
  quantity =1;
  productOriginalPrice!:any;
  subsForProduct!:Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService:ProductsService,
    private cartService:CartServiceService
  ) { }

  ngOnDestroy(): void {
        if(this.subsForProduct){
          this.subsForProduct.unsubscribe();
        }
  }

  ngOnInit(): void {
    this._checkRoute();
    this._getProduct(this.currentProductId);
  }

  addToCart(){

    const cartItem: CartItem = {
      productId:this.product.id,
      quantity:this.quantity
    };
    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(productId:string) {
    this.subsForProduct = this.productService.getProductById(productId).subscribe((productData)=>{
      this.productOriginalPrice = productData.price;
      this.product = productData;
    })
  }

  private _checkRoute() {
    this.route.params.subscribe(response=>{
      if(response.id){
        this.currentProductId = response.id;
      }
    })
  }
}
