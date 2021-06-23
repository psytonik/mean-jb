import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SearchbarComponent } from './components/products/searchbar/searchbar.component';
import { CategoriesBannerComponent } from './components/products/categories-banner/categories-banner.component';
import { OrdersModule } from '@psytonik-dev/orders'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import { FeaturedProductComponent } from './components/products/featured-product/featured-product.component';
import {ButtonModule} from 'primeng/button';
import { ProductsListComponent } from './components/products/products-list/products-list.component';

@NgModule({
  imports: [CommonModule,OrdersModule,HttpClientModule,RouterModule,ButtonModule],
  declarations: [
    SearchbarComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductsListComponent
  ],
  exports:[SearchbarComponent,CategoriesBannerComponent,ProductItemComponent,FeaturedProductComponent,ProductsListComponent]
})
export class ProductsModule {}
