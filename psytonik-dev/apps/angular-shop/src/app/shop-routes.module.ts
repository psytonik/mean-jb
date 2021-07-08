import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./components/home-page/home-page.component";

import { LoginComponent, RegistrationComponent, ShopGuardGuard } from "@psytonik-dev/users";
import {ProductsListComponent} from "@psytonik-dev/products";
import {ProductDetailsComponent} from "@psytonik-dev/products";
import {CartPageComponent} from "@psytonik-dev/orders";
import {CheckoutPageComponent} from "@psytonik-dev/orders";
import {ThankYouPageComponent} from "@psytonik-dev/orders";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'products', component:ProductsListComponent},
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'category/:categoryId', component: ProductsListComponent},
  { path: '', component:HomePageComponent},
  { path: 'cart', component: CartPageComponent},
  { path: 'checkout', component:CheckoutPageComponent,
    canActivate: [ShopGuardGuard],
    children: [{ path: 'success', component:ThankYouPageComponent},
    ]},
  { path: '**',
    redirectTo:'/',
    pathMatch:'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,{ initialNavigation: 'enabled' }),
  ],
  exports:[RouterModule]
})
export class ShopRoutesModule { }
