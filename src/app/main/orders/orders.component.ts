import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders: any;
  orderArray: any = [];
  isLoading: boolean = true;
  isLoaded: boolean = false;
  getItemTotalAmount(price: number, quantity: number) {
    return Number(price) * Number(quantity);
  }
}
