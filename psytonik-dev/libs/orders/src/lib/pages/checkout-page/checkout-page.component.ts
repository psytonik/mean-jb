import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UsersService } from "@psytonik-dev/users";
import { ORDER_STATUS } from "../../constants/orderStatus.constant";
import { Cart, CartItem } from "../../models/cart";
import { Country, Order } from "../../models/order";
import { CartServiceService } from "../../services/cart-service.service";
import { OrdersService } from "../../services/orders.service";

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UsersService,
    private cartService: CartServiceService,
    private orderService: OrdersService
  ) { }

  form!: FormGroup;
  submitted = false;
  countries:Country[] = [];
  orderItems:any;
  userId = '60b7f3ddc0287a90f372013a';

  placeOrder(){
    this.submitted = true;
    if(this.form.invalid){
      return
    }
    const order:Order = {
      orderitems:this.orderItems,
      shippingAddress1:this.checkoutForm.street.value,
      shippingAddress2:this.checkoutForm.apartment.value,
      city:this.checkoutForm.city.value,
      zip:this.checkoutForm.zip.value,
      country:this.checkoutForm.country.value,
      phone:this.checkoutForm.phone.value,
      status:+Object.keys(ORDER_STATUS)[0],
      user:this.userId,
      dateOrdered:`${Date.now()}`
    };
    this.orderService.createOrder(order).subscribe(()=>{

      this.cartService.emptyCart();
      this.router.navigate(['/success']).then(r=>r);
    },(err)=>{
      console.log(err);
    })
  }
  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
    this._getCartItems();
  }
  backToShop(){
    this.router
      .navigate(['/cart']).then(r=>r);
  }

  private _initUserForm(){
    this.form = new FormGroup({
      name:new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      phone: new FormControl(''),
      country: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      street: new FormControl('',Validators.required),
      zip: new FormControl('',Validators.required),
      apartment: new FormControl('',Validators.required)
    })
  }
  private _getCountries() {
    this.countries = this.userService.getCountries();
  }
  get checkoutForm(){
    return this.form.controls;
  }

  private _getCartItems() {
    const cart:Cart = this.cartService.getCart();
    if(cart?.items?.length === 0) {
      this.router.navigate(['/products']).then(r=>r);
    }
    this.orderItems = cart.items?.map((item:CartItem)=>{
        return {
          product:item.productId,
          quantity:item.quantity
        }
      });

  }
}
