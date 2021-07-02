import { Component } from "@angular/core";
import { AuthService } from "@psytonik-dev/users";

@Component({
  selector: 'adminshop-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private authService: AuthService) { }

  onLogOut(){
    this.authService.logOut();
  }

}
