import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  
  cartArray: any[] = [];
  isCartEmpty: boolean = true;
  getItemTotalAmount(price: number, quantity: number) {
    return Number(price) * Number(quantity);
  }
  onAdd(data:any){}
  onRemove(data:any){}
  clearCart(){}

}
