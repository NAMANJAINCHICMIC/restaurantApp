import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { PageNotFoundComponent } from '../auth/page-not-found/page-not-found.component';
import { AuthGuard } from '../utils/guards/auth.guard';
import { AuthInterceptor } from '../utils/interceptors/auth.interceptor';
import { AddChefComponent } from './add-chef/add-chef.component';
import { AddFoodItemComponent } from './add-food-item/add-food-item.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'main',
    component: MainComponent,
    children:[
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
          },
            {
            path: 'home',
            component: HomeComponent,
            canActivate: [AuthGuard]
          },
            {
            path: 'menu',
            component: MenuComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'my-cart',
            component: CartComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'orders',
            component: OrdersComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'add-food',
            component: AddFoodItemComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'add-chef',
            component: AddChefComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'view-profile',
            component: ViewProfileComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'update-profile',
            component: UpdateProfileComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
            canActivate: [AuthGuard],
          },
    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ]
})
export class MainRoutingModule { }