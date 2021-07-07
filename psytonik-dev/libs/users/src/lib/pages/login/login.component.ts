import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Subscription, timer } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { LocalStorageService } from "../../services/local-storage.service";

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit,OnDestroy {

  form!: FormGroup;
  submitted = false;
  authSub!: Subscription;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(){
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required)
    })
  }

  onSubmit(){
    this.submitted = true;

    if(this.form.invalid){
      this.form.reset();
      this.submitted = false;
      return
    }

    this.authSub = this.authService.login(this.loginForm.email.value,this.loginForm.password.value)
      .subscribe((user)=>{
        if(user){
          this.localStorage.setToken(user.token);
        }
        this.messageService.add(
          {severity:'success', summary:'Success', detail:`You Are Logged In Successfully`},
        );
          timer(2000).toPromise().then(()=>{
            this.submitted = false;
            this.form.reset();
            this.router.navigate(['/']).then(r=>r);
          })
    },
      (error:HttpErrorResponse)=>{

      if(error.status === 404){
        this.submitted = false;
        this.form.reset();
        this.messageService.add(
          {severity:'error', summary:'Error', detail:`Something went wrong server ${error.statusText}`}
        );
      }else {
        this.submitted = false;
        this.form.reset();

        this.messageService.add(
          {severity:'error', summary:'Error', detail:error.error.message}
        );
      }

    })
  }

  ngOnDestroy(): void {
    if(this.authSub){
      this.authSub.unsubscribe();
    }
  }



  get loginForm () {
    return this.form.controls;
  }

}
