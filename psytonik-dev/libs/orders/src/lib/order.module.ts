import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CartServiceService } from "./services/cart-service.service";

import { CartIconComponent } from "./components/cart-icon/cart-icon.component";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";

import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputTextModule } from "primeng/inputtext";

import { InputNumberModule } from "primeng/inputnumber";
import { CartSummaryComponent } from "./components/cart-summary/cart-summary.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckoutPageComponent } from "./pages/checkout-page/checkout-page.component";
import { ThankYouPageComponent } from "./pages/thank-you-page/thank-you-page.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
  ],

  providers:[CartServiceService],

  declarations: [
    CartIconComponent,
    CartPageComponent,
    CartSummaryComponent,
    CheckoutPageComponent,
    ThankYouPageComponent
  ],
  exports:[
    CartIconComponent,
    CartPageComponent,
    CartSummaryComponent,
    CheckoutPageComponent,
    ThankYouPageComponent
  ]
})
export class OrderModule {
  constructor(cartService:CartServiceService) {
    cartService.initCartLocalStorage()
  }
}
