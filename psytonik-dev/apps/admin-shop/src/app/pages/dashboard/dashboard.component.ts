import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrdersService } from "@psytonik-dev/orders";
import { ProductsService } from "@psytonik-dev/products";

import { UsersService } from "@psytonik-dev/users";
import { Subscription } from "rxjs";

@Component({
  selector: 'adminshop-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  sales = 0;
  users = 0;
  products = 0;
  orders = 0;

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private orderService: OrdersService,
  ) {
  }

  salesSub!: Subscription;
  usersSub!: Subscription;
  productsSub!: Subscription;
  ordersSub!: Subscription;

  ngOnInit(): void {
    this._getTotalSales();
    this._getTotalOrders();
    this._getTotalProducts();
    this._getUsersCount();
  }
  ngOnDestroy(): void {
    if(this.salesSub){
      this.salesSub.unsubscribe();
    } else if(this.usersSub){
      this.usersSub.unsubscribe();
    } else if(this.productsSub){
      this.productsSub.unsubscribe()
    }else if(this.ordersSub){
      this.ordersSub.unsubscribe();
    }
  }


  private _getUsersCount() {
    this.usersSub = this.userService.getUsersCount().subscribe(data=>{
      this.users = data.userCount
    })
  }

  private _getTotalProducts() {
    this.productsSub = this.productService.getTotalProducts()
      .subscribe(data=> {
        this.products = data.productCount
      })
  }

  private _getTotalOrders() {
    this.ordersSub = this.orderService.getTotalOrders()
      .subscribe(data=> {
        this.orders = data.orderCount
      })
  }

  private _getTotalSales() {
    this.salesSub =this.orderService.totalTotalSales()
      .subscribe(data=>{
        this.sales = data.totalSales;
      })
  }

}
