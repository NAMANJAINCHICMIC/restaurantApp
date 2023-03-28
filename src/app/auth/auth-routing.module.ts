import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from '../utils/guards/auth.guard';
import { AuthInterceptor } from '../utils/interceptors/auth.interceptor';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
},
{
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AuthGuard]
 
},
{
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthGuard]
},
{path:'reset-password',component: ResetPasswordComponent},

{path:'forget-password',component:ForgetPasswordComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ]
})
export class AuthRoutingModule { }
