import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductsService } from '@psytonik-dev/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'products-featured-product',
  templateUrl: './featured-product.component.html'
})
export class FeaturedProductComponent implements OnInit,OnDestroy {

  featuredProducts: Product[] = [];
  productsSub!: Subscription;
  limit: number = 4;
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
