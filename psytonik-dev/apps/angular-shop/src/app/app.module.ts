import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { UiModule } from '@psytonik-dev/ui'
import {AccordionModule} from 'primeng/accordion';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { FooterComponent } from './shared-components/footer/footer.component';



const routes: Routes = [
  { path:'', component: HomePageComponent },
  { path: 'products', component: ProductListPageComponent }
]

@NgModule({
  declarations: [AppComponent, HomePageComponent, ProductListPageComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule,RouterModule.forRoot(routes),UiModule,AccordionModule,BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
