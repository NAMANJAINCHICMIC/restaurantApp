import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { SocketService } from 'src/app/services/socket.service';
import { Cart } from 'src/app/utils/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  
  cartArray: any[] = [];
  isCartEmpty: boolean = true;
  // getItemTotalAmount(price: number, quantity: number) {
  //   return Number(price) * Number(quantity);
  // }
  // onAdd(data:any){}
  // onRemove(data:any){}
  // clearCart(){}

    cartObj: Cart | null;
    // cartArray: any[] = [];
    // isCartEmpty: boolean = true;
  
    constructor(
  
      private mainService: MainService,
      private router: Router,
      private socketService :SocketService
    ) {
      this.cartObj = JSON.parse(this.mainService.getCartData()||'{}');
    }
  
    ngOnInit(): void {
      this.populateCartData();
      // hide bottom cart bar when viewing cart page
     
    }
  
   
  
    populateCartData() {
      if (this.cartObj  && this.cartObj.items ) {
        this.isCartEmpty = false;
        const itemD = this.cartObj.items;
  
        for (let item in itemD) {
          const itemObj = itemD[item];
  // console.log("itemObj",itemObj)
          const obj = {
            foodId: itemObj.itemId,
            foodName: itemObj.name,
            category: itemObj.category,
            price: itemObj.price,
            pathToPic: itemObj.imageUrl,
            quantity: itemObj.quantity,
            timeToPrepare:itemObj.timeToPrepare
          };
  
          this.cartArray.push(obj);
        }
      } else {
        this.isCartEmpty = true;
      }
      console.log("itemObj",this.cartArray)
    }
  
    /** add to cart */
    onAdd(item: any) {
      item.quantity += 1; //two-way binded
      this.mainService.addOrUpdate(item);
    }
  
    /** remove from cart */
    onRemove(item: any) {
      item.quantity -= 1; //two-way binded
      this.mainService.removeItem(item);
  
      // if not items in cart
      // set isCartEmpty to true
      this.cartObj = JSON.parse(this.mainService.getCartData()||'{}');
      if(this.cartObj == null) {
        this.isCartEmpty = true;
      }
    }
  
    getItemTotalAmount(price: number, quantity: number) {
      return Number(price) * Number(quantity);
    }
   
    clearCart() {
      this.isCartEmpty = true;
      this.cartArray = [];
      this.cartObj = null;
      this.mainService.clearCart();
    }
    orderDetails:any={};
    orderDetailsChanged() {

      this.orderDetails.list=[];
      for(let foodItem of this.cartArray)
      {
          this.orderDetails.list.push({foodId:foodItem.foodId,quantity:foodItem.quantity})
      }
      
    }
    placeOrder(){
      // this.mainService.removeCartData();
      console.log(localStorage.getItem('cart'));
      this.orderDetailsChanged()
      this.socketService.userPlaceOrder(this.orderDetails)
      // console.log(this.orderDetails);
    }
}
