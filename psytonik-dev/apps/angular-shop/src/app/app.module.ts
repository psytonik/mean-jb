import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { OrdersModule } from '@psytonik-dev/orders';
import { ProductsModule } from '@psytonik-dev/products';
import { UiModule } from '@psytonik-dev/ui';
import {ToastModule} from 'primeng/toast';


import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { MessageService } from 'primeng/api';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  { path:'', component: HomePageComponent }
];

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
    RouterModule.forRoot(routes),
    UiModule,
    BrowserAnimationsModule,
    ProductsModule,
    OrdersModule,
    ToastModule
  ],

  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
