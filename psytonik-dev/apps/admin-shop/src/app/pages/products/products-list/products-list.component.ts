import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product,ProductsService } from '@psytonik-dev/products'
import { ConfirmEventType,MessageService,ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'adminshop-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit,OnDestroy {

  products:Product[] = [];

  deleteSub!: Subscription;
  getProductSub!: Subscription;

  constructor(private productService: ProductsService,
              private router:Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnDestroy(): void {
    if(this.getProductSub){
      this.getProductSub.unsubscribe();
    } else if(this.deleteSub){
      this.deleteSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._getProducts();
  }

  deleteProduct(id:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete category?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
        this.deleteSub = this.productService.deleteProduct(id).subscribe(()=>{
          this.products = this.products.filter((product)=>product.id !== id);
          this.messageService.add({severity:'success', summary:'Successfully Deleted', detail:'Category Successfully Deleted'});
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

  editProduct(id:string){
    this.router.navigateByUrl(`products/form/${id}`);
  }

  private _getProducts(){
    this.getProductSub =this.productService.getProducts()
      .subscribe((data)=>{
        this.products = data;
      })
  }
}
