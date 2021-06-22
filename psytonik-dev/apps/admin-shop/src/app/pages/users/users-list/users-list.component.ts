import { Component, OnDestroy, OnInit } from '@angular/core';
import {ConfirmationService,ConfirmEventType,MessageService} from 'primeng/api';
import {User, UsersService } from '@psytonik-dev/users';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'adminshop-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, OnDestroy {

  users:User[] = [];
  user!:User;
  userSub!: Subscription;
  deleteSub!: Subscription;
  editSub!: Subscription;

  constructor(
    private userService:UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this._getUsers()
  }

  private _getUsers() {
    this.userSub = this.userService.getUsers().subscribe(users=>{
      this.users = users;
    })
  }

  onDelete(id:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
        this.deleteSub = this.userService.deleteUser(id).subscribe(()=>{
          this.users = this.users.filter((user)=>user.id !== id);
          this.messageService.add({severity:'success', summary:'Successfully Deleted', detail:'User Successfully Deleted'});
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
    this.router.navigateByUrl(`users/form/${id}`);
    this.editSub = this.userService.getUser(id)
      .subscribe(user=>{
        this.user = user;
      })
  }

  ngOnDestroy(): void {
    if (this.userSub){
      this.userSub.unsubscribe();
    } else if(this.deleteSub){
      this.deleteSub.unsubscribe();
    } else if (this.editSub){
      this.editSub.unsubscribe();
    }
  }

  getCountry(country:string){
    return this.userService.getCountry(country)
  }
}
