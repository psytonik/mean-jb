import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SearchbarComponent } from './components/products/searchbar/searchbar.component';
import { CategoriesBannerComponent } from './components/products/categories-banner/categories-banner.component';
import { OrdersModule } from '@psytonik-dev/orders'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { FeaturedProductComponent } from './components/products/featured-product/featured-product.component';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import {GalleriaModule} from 'primeng/galleria';
import {UiModule} from '@psytonik-dev/ui';

const routes:Routes = [
  {path:'products', component:ProductsListComponent},
  {path: 'category/:categoryId',component: ProductsListComponent},
  {path: 'products/:id',component: ProductDetailsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    OrdersModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    GalleriaModule,
    UiModule
  ],
  declarations: [
    SearchbarComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductsListComponent,
    ProductDetailsComponent
  ],
  exports:[
    SearchbarComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductsListComponent,
    ProductDetailsComponent
  ]

})
export class ProductsModule {}
