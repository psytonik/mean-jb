import { Component, OnDestroy, OnInit } from "@angular/core";

import { Subscription } from "rxjs";
import { Product } from "../../../models/product";
import { ProductsService } from "../../../services/products.service";

@Component({
  selector: 'products-featured-product',
  templateUrl: './featured-product.component.html'
})
export class FeaturedProductComponent implements OnInit,OnDestroy {

  featuredProducts: Product[] = [];
  productsSub!: Subscription;
  limit = 4;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this._featuredProducts(this.limit)
  }

  private _featuredProducts(count:number) {
    this.productsSub = this.productService.getFeaturedProducts(count)
      .subscribe((products)=>{
        if(products){
          this.featuredProducts = products;
        }
      })
  }

  ngOnDestroy(): void {
    if(this.productsSub){
      this.productsSub.unsubscribe();
    }
  }


}
