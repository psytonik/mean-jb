import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";

@Component({
  selector: 'users-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  submittedForm = false;
  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(){
    this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required)
    })
  }
  onSubmit(){
    console.log('hit')
    this.usersService.createUser({
      name:this.registrationForm.name.value,
      email:this.registrationForm.email.value,
      password:this.registrationForm.password.value
    })
      .subscribe((done:User)=>{
        console.log(done);
      })
  }

  get registrationForm () {
    return this.form.controls;
  }
}
