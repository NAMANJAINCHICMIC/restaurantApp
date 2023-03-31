import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { SocketService } from 'src/app/services/socket.service';
import { PAGE } from 'src/app/utils/constants/link';
import { Cart } from 'src/app/utils/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  
  cartArray: any[] = [];
  isCartEmpty: boolean = false;
  orderDetails:any={};
    cartObj: Cart | null;
    totalAmt?: number;
    totalItems?: number;

    constructor(
      private mainService: MainService,
      private router: Router,
      private socketService :SocketService
    ) {
      this.cartObj = JSON.parse(this.mainService.getCartData()||'{}');

      this.mainService.getCartDataObservable().subscribe((data:any) => {
        // here data is cart data object
        // console.log("obs",Object.keys(data.items))
        if (data && Object.keys(data.items).length > 0) {
          // console.log("data",(data.items))
          this.isCartEmpty = true;
          this.totalAmt = data.totalAmt;
          this.totalItems = Object.keys(data.items).length;
        }
        else{
          this.isCartEmpty = false;
        }
      
      });
    }
  
    ngOnInit(): void {
      this.populateCartData();    
    }
   
    populateCartData() {
      if (this.cartObj  && this.cartObj.items ) {
        this.isCartEmpty = true;
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
        this.isCartEmpty = false;
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
      if(!this.cartObj) {
        this.isCartEmpty = false;
      }
    }
  
    getItemTotalAmount(price: number, quantity: number) {
      return Number(price) * Number(quantity);
    }
   
    clearCart() {
      this.isCartEmpty = false;
      this.cartArray = [];
      this.cartObj = null;
      this.mainService.clearCart();
    }

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
      this.clearCart()
      this.router.navigate([PAGE.ORDERS]);
    }
}
