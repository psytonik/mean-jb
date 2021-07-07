import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {timer} from "rxjs";


@Component({
  selector: 'users-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  submittedForm = false;
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
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
    this.submittedForm = true;
    this.authService.registration({
      name:this.registrationForm.name.value,
      email:this.registrationForm.email.value,
      password:this.registrationForm.password.value
    })
      .subscribe((user:User)=>{
        this.messageService.add(
          {severity:'success', summary:'Success', detail:`${user.name} You Are successfully registered to our shop`},
        );
        timer(2000).toPromise().then(()=>{
          this.submittedForm = false;
          this.form.reset();
          this.router.navigate(['/login']).then(r=>r);
        })
      },(err)=>{
        this.messageService.add(
          {severity:'error', summary:'Error', detail:err.error.message}
        );
        this.submittedForm = false;
        this.form.reset();
      })
  }

  get registrationForm () {
    return this.form.controls;
  }
}
