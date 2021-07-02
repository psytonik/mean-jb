import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ORDER_STATUS, OrdersService } from "@psytonik-dev/orders";
import { Location } from "@angular/common";
import { MessageService } from "primeng/api";

import { Subscription } from "rxjs";


@Component({
  selector: 'adminshop-order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit,OnDestroy {

  order: any = {};
  orderStatuses:any = [];
  selectedStatus:any;
  changeSub!:Subscription;
  getOrderSub!: Subscription;
  routeParamsSub!: Subscription;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._getOrder();
    this._mapOrderStatus();
  }

  onStatusChange(event: any){
    this.changeSub = this.orderService.updateOrder({status:event.value},this.order.id)
      .subscribe(()=>{

        this.messageService.add(
          {severity:'success', summary:'Success', detail:`Order status is Changed Successfully`}
        );
      },(error) => {
        this.messageService.add(
          {severity:'error', summary:'Error', detail:error.message}
        );
      })
  }

  ngOnDestroy(): void {
    if(this.changeSub){
      this.changeSub.unsubscribe();
    }else if (this.getOrderSub){
      this.getOrderSub.unsubscribe();
    } else if(this.routeParamsSub){
      this.routeParamsSub.unsubscribe();
    }
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key:string)=>{
      return {
        id:key,
        name:ORDER_STATUS[key].label
      }
    });
  }

  private _getOrder() {
    this.routeParamsSub = this.route.params.subscribe((response)=>{

      if(response.id){
        this.getOrderSub = this.orderService.getOrder(response.id)
          .subscribe((order:any)=>{
            this.order = order;
            this.selectedStatus = order.status;
          })
      }
    })
  }

}
