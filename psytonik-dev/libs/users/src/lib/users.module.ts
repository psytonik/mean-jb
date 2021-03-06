import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from "./pages/login/login.component";

import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

import { AuthService } from "./services/auth.service";
import { LocalStorageService } from "./services/local-storage.service";
import { RegistrationComponent } from './pages/registration/registration.component';
import {RouterModule} from "@angular/router";

const UX_MODULES = [
  InputTextModule,
  ButtonModule,
  FormsModule,
  ReactiveFormsModule,
  ToastModule,
  PasswordModule
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, UX_MODULES, RouterModule],
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  providers:[AuthService,MessageService,LocalStorageService],
  exports:[]
})
export class UsersModule {}
