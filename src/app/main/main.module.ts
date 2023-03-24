import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../shared/header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AddFoodItemComponent } from './add-food-item/add-food-item.component';
import { AddChefComponent } from './add-chef/add-chef.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    CartComponent,
    OrdersComponent,
    ViewProfileComponent,
    UpdateProfileComponent,
    AddFoodItemComponent,
    AddChefComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports:[
    MatIconModule
  ]
})
export class MainModule { }
