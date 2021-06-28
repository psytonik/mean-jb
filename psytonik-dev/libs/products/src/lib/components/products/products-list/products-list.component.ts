import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService,Product, CategoriesService, Category } from '@psytonik-dev/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'products-featured-product',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit,OnDestroy {

  products!: Product[];
  categories!:Category[];
  isCategoryPage!: boolean;

  constructor(
    private productsService: ProductsService,
    private categoryService:CategoriesService,
    private route: ActivatedRoute) {}

  getProductsSub!: Subscription;
  getCategorySub!: Subscription;

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      params.categoryId ? this._getProducts([params.categoryId]): this._getProducts();
      params.categoryId ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this._getCategories()
  }

  private _getProducts(categoriesFilter?:any[]) {
    this.getProductsSub = this.productsService.getProducts(categoriesFilter)
      .subscribe(productData=>{
        this.products = productData;
      })
  }

  private _getCategories() {
    this.getCategorySub = this.categoryService.getCategories()
      .subscribe(cats=>{
        this.categories = cats;
      })
  }

  categoryFilter(){
    const selectedCategories = this.categories
      .filter((category)=> category.checked)
      .map((category)=>category.id);
    this._getProducts(selectedCategories);
  }

  ngOnDestroy(): void {
    if(this.getProductsSub){
      this.getProductsSub.unsubscribe();
    } else if(this.getCategorySub){
      this.getCategorySub.unsubscribe();
    }
  }
}
