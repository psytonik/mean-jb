import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {User, UsersService } from '@psytonik-dev/users';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer,Subscription } from 'rxjs';
export interface Country {
  id:string,
  name:string
}

@Component({
  selector: 'adminshop-users-form',
  templateUrl: './users-form.component.html'
})

export class UsersFormComponent implements OnInit,OnDestroy {

  editMode = false;
  submitted = false;
  form!: FormGroup;
  currentUserId: string = '';
  countries:Country[] = [];

  addUserSub!: Subscription;
  updateUserSub!: Subscription;
  routeParamsSub!: Subscription;
  getUsersSub!: Subscription;

  constructor(
    private location:Location,
    private userService:UsersService,
    private route:ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnDestroy(): void {
    if(this.addUserSub){
      this.addUserSub.unsubscribe();
    } else if(this.updateUserSub){
      this.updateUserSub.unsubscribe();
    } else if(this.routeParamsSub){
      this.routeParamsSub.unsubscribe();
    } else if(this.getUsersSub){
      this.getUsersSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._checkEditMode();
    this._initUserForm();
    this._getCountries();
  }

  onSubmit(){
    this.submitted = true;
    if (this.form.invalid){
      return
    }
    const user: User = {
      id:this.currentUserId,
      name:this.userForm.name.value,
      email:this.userForm.email.value,
      password:this.userForm.password.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value
    }
    if(this.editMode){
      return this._updateUser(user)
    } else {
      return this._addUser(user);
    }
  }

  onCancel(){
    this.location.back();
  }

  private _addUser(user:User){
    this.addUserSub = this.userService.createUser(user)
      .subscribe((user: User)=>{
        this.messageService.add(
          {severity:'success', summary:'Success', detail:`${user.name} is Created Successfully`}
        );
        this.form.reset();
        timer(2000).toPromise().then(()=>{
          this.submitted = false;
          this.router.navigate(['users']);
        })
      },(error) => {
        this.messageService.add(
          {severity:'error', summary:'Error', detail:error.message}
        );
        this.submitted = false;
      })
  }

  private _updateUser(user:User){
    this.updateUserSub = this.userService.updateUser(user)
      .subscribe((user: User)=>{
        this.messageService.add(
          {severity:'success', summary:'Success', detail:`User ${user.name} is Updated Successfully`}
        );
        this.form.reset();
        timer(2000).toPromise().then(()=>{
          this.submitted = false;
          this.router.navigate(['users']);
        })
      },(error) => {
        this.messageService.add(
          {severity:'error', summary:'Error', detail:error.message}
        );
        this.submitted = false;
      })
  }

  get userForm(){
    return this.form.controls;
  }

  private _checkEditMode(){
    this.routeParamsSub =this.route.params.subscribe((response)=>{
      if(response.id) {
        this.editMode = true;
        this.currentUserId = response.id;
        this.getUsersSub = this.userService.getUser(response.id).subscribe((data)=>{
          this.userForm.name.setValue(data.name);
          this.userForm.email.setValue(data.email);
          this.userForm.phone.setValue(data.phone);
          this.userForm.isAdmin.setValue(data.isAdmin);
          this.userForm.country.setValue(data.country);
          this.userForm.city.setValue(data.city);
          this.userForm.street.setValue(data.street);
          this.userForm.zip.setValue(data.zip);
          this.userForm.apartment.setValue(data.apartment);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        })
      }
    })
  }

  private _initUserForm(){
    this.form = new FormGroup({
      name:new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),
      isAdmin: new FormControl(false),
      country: new FormControl(''),
      city: new FormControl(''),
      street: new FormControl(''),
      zip: new FormControl(''),
      apartment: new FormControl('')
    })
  }

  private _getCountries() {
    this.countries = this.userService.getCountries();
  }

}
