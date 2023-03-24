import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { VerifyUserComponent } from './auth/verify-user/verify-user.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { AuthInterceptor } from './utils/interceptors/auth.interceptor';
import { HomeComponent } from './main/home/home.component';
import { MenuComponent } from './main/menu/menu.component';
import { OrdersComponent } from './main/orders/orders.component';
import { AddFoodItemComponent } from './main/add-food-item/add-food-item.component';
import { AddChefComponent } from './main/add-chef/add-chef.component';
import { ViewProfileComponent } from './main/view-profile/view-profile.component';
import { UpdateProfileComponent } from './main/update-profile/update-profile.component';
import { CartComponent } from './main/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
},
{
    path: 'sign-in',
    component: SignInComponent,
    // canActivate:[AuthGuard]
 
},
{
    path: 'sign-up',
    component: SignUpComponent,
    // canActivate:[AuthGuard]

},
{path:'reset-password',component: ResetPasswordComponent},
{path:'verify-user',component: VerifyUserComponent},
{path:'change-password',component:ChangePasswordComponent,  
//  canActivate:[AuthGuard]
},
{path:'forget-password',component:ForgetPasswordComponent},

{
    path: 'home',
    component: HomeComponent,
        // canActivate:[AuthGuard]
},
{
    path: 'menu',
    component: MenuComponent,
        // canActivate:[AuthGuard]
},
{
    path: 'my-cart',
    component: CartComponent,
        // canActivate:[AuthGuard]
},
{
    path: 'orders',
    component: OrdersComponent,
        // canActivate:[AuthGuard]
},
{
    path: 'add-food',
    component: AddFoodItemComponent,
        // canActivate:[AuthGuard]
},
{
    path: 'add-chef',
    component: AddChefComponent,
        // canActivate:[AuthGuard]
},
{
    path: 'view-profile',
    component: ViewProfileComponent,
        // canActivate:[AuthGuard]
},
{
    path: 'update-profile',
    component: UpdateProfileComponent,
        // canActivate:[AuthGuard]
},
{
    path: '**',
    component: PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ]
})
export class AppRoutingModule { }
