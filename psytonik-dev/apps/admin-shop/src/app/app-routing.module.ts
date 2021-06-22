import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from "@psytonik-dev/users";
import { LoginComponent } from "libs/users/src/lib/pages/login/login.component";

import { CategoriesFormComponent } from "./pages/categories/categories-form/categories-form.component";
import { CategoriesListComponent } from "./pages/categories/categories-list/categories-list.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { OrderDetailsComponent } from "./pages/orders/order-details/order-details.component";
import { OrdersListComponent } from "./pages/orders/orders-list/orders-list.component";
import { ProductsFormComponent } from "./pages/products/products-form/products-form.component";
import { ProductsListComponent } from "./pages/products/products-list/products-list.component";
import { UsersFormComponent } from "./pages/users/users-form/users-form.component";
import { UsersListComponent } from "./pages/users/users-list/users-list.component";
import { ShellComponent } from "./shared/shell/shell.component";

const adminRoutes: Route[] = [
  {
    path:'login',component:LoginComponent
  },
  {
    path:'',
    component:ShellComponent,
    canActivate:[AuthGuard],
    children: [
      {path: '',component: DashboardComponent},

      {path: 'categories',component: CategoriesListComponent},
      {path: 'categories/form',component: CategoriesFormComponent},
      {path: 'categories/form/:id',component: CategoriesFormComponent},

      {path: 'products',component: ProductsListComponent},
      {path: 'products/form',component: ProductsFormComponent},
      {path: 'products/form/:id',component: ProductsFormComponent},

      {path: 'users',component: UsersListComponent},
      {path: 'users/form',component: UsersFormComponent},
      {path: 'users/form/:id',component: UsersFormComponent},

      {path: 'orders',component: OrdersListComponent},
      {path: 'orders/:id',component: OrderDetailsComponent}
    ]
  },
  {
    path: '**', redirectTo: '',
    pathMatch:'full'
  }
];

@NgModule({
  imports:[
    RouterModule.forRoot(adminRoutes, { initialNavigation: 'enabled' }),
  ],
  exports:[RouterModule],
  providers:[],
  declarations:[]
})
export class AppRoutingModule {

}
