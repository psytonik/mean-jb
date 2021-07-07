import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { OrderModule } from "@psytonik-dev/orders";
import { ProductsModule } from "@psytonik-dev/products";
import { UiModule } from "@psytonik-dev/ui";

import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";


import { AppComponent } from "./app.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { HeaderComponent } from "./shared-components/header/header.component";
import { FooterComponent } from "./shared-components/footer/footer.component";
import { NavbarComponent } from "./shared-components/navbar/navbar.component";
import { MessagesComponent } from "./components/messages/messages.component";

import {ShopRoutesModule} from "./shop-routes.module";




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    MessagesComponent
  ],

  imports: [
    BrowserModule,
    UiModule,
    BrowserAnimationsModule,
    ProductsModule,
    OrderModule,
    ToastModule,
    ShopRoutesModule
  ],
  exports:[],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
