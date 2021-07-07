// Angular Modules Import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { JwtInterceptor, UsersModule } from '@psytonik-dev/users';
import { AppRoutingModule } from './app-routing.module';
import { AppUxModule } from './app-ux.module';

// Services
import {CategoriesService,ProductsService } from '@psytonik-dev/products';
import {OrdersService } from '@psytonik-dev/orders';
import {UsersService } from '@psytonik-dev/users';
import {ConfirmationService,MessageService} from 'primeng/api';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrderDetailsComponent } from './pages/orders/order-details/order-details.component';




@NgModule({
  declarations: [AppComponent, DashboardComponent,
    ShellComponent, SidebarComponent, CategoriesListComponent,
    CategoriesFormComponent, ProductsFormComponent, ProductsListComponent,
    UsersListComponent, UsersFormComponent, OrdersListComponent, OrderDetailsComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppUxModule,
    UsersModule
  ],
  providers: [CategoriesService,MessageService,ConfirmationService,ProductsService,UsersService,OrdersService,
    {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
