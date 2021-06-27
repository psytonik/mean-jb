import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService,Product } from '@psytonik-dev/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'products-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit,OnDestroy {

  product!:Product;
  currentProductId: string = '';
  quantity!: number;
  productOriginalPrice!:any;
  subsForProduct!:Subscription;
  constructor(private route: ActivatedRoute,private productService:ProductsService) { }

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

  }

  private _getProduct(productId:string) {
    this.subsForProduct = this.productService.getProductById(productId).subscribe((productData)=>{
      console.log(productData.price);
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
