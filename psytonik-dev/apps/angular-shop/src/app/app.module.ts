import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { UiModule } from '@psytonik-dev/ui';
import { ProductsModule } from '@psytonik-dev/products';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { HeaderComponent } from './shared-components/header/header.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';

const routes: Routes = [
  { path:'', component: HomePageComponent }
];

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent,NavbarComponent],
  imports: [BrowserModule,RouterModule.forRoot(routes),UiModule,BrowserAnimationsModule,ProductsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
