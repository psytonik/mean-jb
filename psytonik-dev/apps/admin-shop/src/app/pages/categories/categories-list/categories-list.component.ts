import { Component, OnDestroy, OnInit } from '@angular/core';
import {CategoriesService, Category} from '@psytonik-dev/products'
import { Subscription } from 'rxjs';
import {ConfirmationService,ConfirmEventType,MessageService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'adminshop-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit,OnDestroy {

  constructor(
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  categories:Category[] = [];
  category!: Category;
  createSub!: Subscription;
  deleteSub!: Subscription;
  editSub!: Subscription;

  ngOnInit(): void {
    this.createSub = this.categoryService.getCategories()
      .subscribe((data: any)=>{
        this.categories = data;
      })
  }

  onDelete(id:string):void{
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete category?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
        this.deleteSub = this.categoryService.deleteCategory(id).subscribe(()=>{
          this.categories = this.categories.filter((category)=>category.id !== id);
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

  onEdit(id:string){
    this.router.navigateByUrl(`categories/form/${id}`);
    this.editSub = this.categoryService.getCategoryById(id)
      .subscribe(data => {
        this.category = data;
      })
  }
  ngOnDestroy(): void {
    if(this.createSub){
      this.createSub.unsubscribe();
    } else if(this.deleteSub) {
      this.deleteSub.unsubscribe();
    } else if(this.editSub){
      this.editSub.unsubscribe();
    }
  }

}

