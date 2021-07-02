import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { OrderModule } from "@psytonik-dev/orders";
import { UiModule } from "@psytonik-dev/ui";

import { SearchbarComponent } from "./components/products/searchbar/searchbar.component";
import { CategoriesBannerComponent } from "./components/products/categories-banner/categories-banner.component";
import { ProductItemComponent } from "./components/products/product-item/product-item.component";
import { ProductsListComponent } from "./components/products/products-list/products-list.component";
import { FeaturedProductComponent } from "./components/products/featured-product/featured-product.component";
import { ProductDetailsComponent } from "./components/products/product-details/product-details.component";

import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { GalleriaModule } from "primeng/galleria";
import { RatingModule } from "primeng/rating";
import { InputNumberModule } from "primeng/inputnumber";

const routes:Routes = [
  {path:'products', component:ProductsListComponent},
  {path: 'category/:categoryId',component: ProductsListComponent},
  {path: 'products/:id',component: ProductDetailsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    GalleriaModule,
    UiModule,
    OrderModule,
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
