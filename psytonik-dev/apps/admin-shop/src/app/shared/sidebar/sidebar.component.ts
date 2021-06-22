import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@psytonik-dev/users';
import { Subscription } from 'rxjs';

@Component({
  selector: 'adminshop-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit,OnDestroy {

  constructor(private authService: AuthService) { }
  logOutSub!:Subscription;
  ngOnDestroy(): void {
      if(this.logOutSub){
        this.logOutSub.unsubscribe();
      }
  }

  ngOnInit(): void {
  }

  onLogOut(){
    this.logOutSub = this.authService.logOut();
  }

}
