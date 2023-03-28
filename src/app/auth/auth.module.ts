import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,RouterModule, AuthRoutingModule
  ],
 
  providers: [ AuthService]
})
export class AuthModule { }
