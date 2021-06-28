import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CartServiceService } from './services/cart-service.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';


const ordersRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule,RouterModule,BadgeModule],
  providers:[],
  declarations: [
    CartIconComponent
  ],
  exports:[CartIconComponent]
})
export class OrdersModule {
  constructor(cartService:CartServiceService) {
    cartService.initCartLocalStorage()
  }
}
