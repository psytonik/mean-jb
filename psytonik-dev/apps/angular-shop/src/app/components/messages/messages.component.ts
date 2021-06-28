import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '@psytonik-dev/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {

  constructor(private cartService: CartServiceService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.cartService.cartSubscription.subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cart Updated!'
      });
    });
  }

}
