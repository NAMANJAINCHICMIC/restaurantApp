import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { AuthInterceptor } from './utils/interceptors/auth.interceptor';
import { HomeComponent } from './main/home/home.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';

const routes: Routes = [
{
  path:'',
  redirectTo:'auth',
  pathMatch:'full'
},
{
  path:'auth',
  loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
  // canActivate: [AuthGuard]
},
{
  path:'main',
  loadChildren:()=>import('./main/main.module').then(m=>m.MainModule),
  // canActivate: [AuthGuard]
},
{
  path: '**',
  component: PageNotFoundComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ]
})
export class AppRoutingModule { }
