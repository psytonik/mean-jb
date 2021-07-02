import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Order, ORDER_STATUS, OrdersService } from "@psytonik-dev/orders";
import { ConfirmationService, ConfirmEventType, MessageService } from "primeng/api";
import { Subscription } from "rxjs";


@Component({
  selector: 'adminshop-orders-list',
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit,OnDestroy {

  deleteSub!: Subscription;
  getOrdersSub!: Subscription;
  orderStatus:any = ORDER_STATUS;
  orders:Order[] = [];

  constructor(
    private ordersService:OrdersService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private router:Router
  ) { }

  ngOnDestroy(): void {
    if(this.deleteSub){
      this.deleteSub.unsubscribe();
    } else if (this.getOrdersSub){
      this.getOrdersSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._getOrders();
  }

  onDelete(id:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete category?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
        this.deleteSub = this.ordersService.deleteOrder(id).subscribe(()=>{
          this.orders = this.orders.filter((order)=>order.id !== id);
          this.messageService.add({severity:'success', summary:'Successfully Deleted', detail:'Order Successfully Deleted'});
        },(error)=>{
          this.messageService.add({severity:'danger', summary:'Delete Failed', detail:error.message});
        })
      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            break;
        }
      }
    });
  }

  onView(id:string){
    this.router.navigateByUrl(`orders/${id}`).then(r => r);
  }

  private _getOrders(){
    this.getOrdersSub = this.ordersService.getOrders().subscribe((orders)=>{
      this.orders = orders;
    })
  }

}
