import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environment';
import { APIS } from '../utils/constants/link';
import { Cart } from '../utils/models/cart';

const AUTH_API = environment.AUTH_API;

@Injectable({
  providedIn: 'root'
})
export class MainService {
  userRole ?:string;
  showCart = true;
  cartObj :Cart | null = null;
  orderDetail = new BehaviorSubject<any>(null);
  allOrderDetail = new BehaviorSubject<any>(null);
  onCartPageSub = new BehaviorSubject<boolean>(false);
  onConfirmOrderPageSub = new BehaviorSubject<boolean>(false);
  cartDataSub = new BehaviorSubject<Cart|null>(null);
  constructor(private http: HttpClient , private router: Router) { 
    this.cartObj = this.getCartDataConverted();
  }

   imageUpload(file: any): Observable<any> {
   
    return this.http.post(
      AUTH_API + APIS.MAIN.IMAGE_UPLOAD, file, 
    );
  }
   foodImageUpload(file: any): Observable<any> {
   
    return this.http.post(
      AUTH_API + APIS.MAIN.FOOD_IMAGE_UPLOAD, file, 
    );
  }
  userProfile(){
    return this.http.get(
      AUTH_API + APIS.MAIN.VIEW_PROFILE  
    );
  }
  updateUserProfile(data:any):Observable<any>{
    return this.http.put(AUTH_API + APIS.MAIN.UPDATE_PROFILE , data)
  }
  toggleBlock(data:any):Observable<any>{
    return this.http.delete(AUTH_API + APIS.MAIN.TOGGLE_BLOCK +`?userId=${data}`)
  }
  addFood(data:any):Observable<any>{
    return this.http.post(AUTH_API + APIS.MAIN.ADD_fOOD , data)
  }
  addChef(data:FormGroup): Observable<any> {
    return this.http.post(
      AUTH_API + APIS.MAIN.ADD_CHEF,
   data.value
    );
  }
  getUsers(page:any,role:any = 'all'){
    return this.http.get(
      AUTH_API + APIS.MAIN.GET_USERS+`?PageNumber=${page}`+`&userType=${role}`
    );
  }
  getUsersBySearch(searchQuery:any,role:any = 'all'){
    return this.http.get(
      AUTH_API + APIS.MAIN.GET_USERS+`?searchString=${searchQuery}`+`&userType=${role}`
    );
  }
  getFood(page:any){
    return this.http.get(
      AUTH_API + APIS.MAIN.GET_fOOD+`?PageNumber=${page}`
    );
  }
  getFoodByCategory(page:number,category:string){
    return this.http.get(
      AUTH_API + APIS.MAIN.GET_fOOD+`?PageNumber=${page}&category=${category}`
    );
  }
  chefGetOrderDetail(orderId:any){
     this.http.get(
      AUTH_API + APIS.MAIN.GET_ORDERS_BY_ADMINCHEF+`?orderId=${orderId}`
    ).subscribe((res:any)=>{
     
       console.log("orderdetail",res);
       this.orderDetail.next(res?.data?.list[0])
    
     });
  }
  userGetOrderDetail(orderId:any){
     this.http.get(
      AUTH_API + APIS.MAIN.GET_ORDERS_BY_USER+`?orderId=${orderId}`
    ).subscribe((res:any)=>{
   
       console.log("orderdetail",res);
       this.orderDetail.next(res?.data?.list[0])
  
     });
  }
  userGetAllOrderDetail(page:number){
    return this.http.get(
      AUTH_API + APIS.MAIN.GET_ORDERS_BY_USER+`?PageNumber=${page}`
      );
  }
  adminGetAllOrderDetail(page:number){
    return this.http.get(
      AUTH_API + APIS.MAIN.GET_ORDERS_BY_ADMINCHEF+`?PageNumber=${page}`
      );
  }
  addOrUpdate(item: any) {
    // get cart data from local storage
  console.log(item)
    this.cartObj = this.getCartDataConverted();
    // add cart object for the first time
    if (!this.cartObj) {
      const cart: Cart = {
        items: {
          [item.foodId]:{

            quantity: item.quantity,
            itemId: item.foodId,
            category: item.category,
            name: item.foodName,
            price: item.price,
            imageUrl: item.pathToPic,
            timeToPrepare:item.timeToPrepare
          },
          },
       
        totalAmt: item.price,
      };
      this.addCartData(cart);
      
    } else {
      // add a new item to cart
      if (!this.cartObj.items[item.foodId]) {
        const itemD: any = {
          [item.foodId]: {
           
            quantity: item.quantity,
            itemId: item.foodId,
            category: item.category,
            name: item.foodName,
            price: item.price,
            imageUrl: item.pathToPic,
            timeToPrepare:item.timeToPrepare
          },
        };
        this.cartObj = {
          items: {
            ...this.cartObj.items,
            [item.foodId]: itemD[item.foodId],
          },
          totalAmt: this.getCartTotalAmount(item.price, true),
        };
        this.addCartData(this.cartObj );

      } else {
 
        const itemD = this.cartObj.items[item.foodId];
        itemD.quantity += 1;
        this.cartObj.items[item.foodId] = itemD;

        this.cartObj.totalAmt = this.getCartTotalAmount(item.price, true);

        this.addCartData(this.cartObj);
      }
    }
  }

 
  removeItem(item: any) {
    
    this.cartObj = this.getCartDataConverted();
    
    if (this.cartObj) {
      const itemD = this.cartObj.items[item.foodId];

      if (itemD.quantity > 1) {
    
        itemD.quantity -= 1;
        this.cartObj.items[item.foodId] = itemD;
      } else if (itemD.quantity == 1) {
      
        delete this.cartObj.items[item.foodId];
      }

      this.cartObj.totalAmt = this.getCartTotalAmount(item.price, false);
    }
    this.addCartData(this.cartObj);

  }

  
  getCartTotalAmount(price: number, add: boolean): number {
    let amt: number;

    if (add == true) {
      amt = Number(this.cartObj?.totalAmt) + Number(price);
    } else {
      amt = Number(this.cartObj?.totalAmt) - Number(price);
    }

    return amt;
  }

  /** check for cart data in local storage */
  getCartDataConverted() {
    if (this.getCartData()) {
      return JSON.parse(this.getCartData()||'{}');
    }

    return null;
  }


  
  clearCart() {
    this.cartObj = null;
    this.removeCartData();
  }

  // cart locol storage
  addCartData(cart: Cart |null) {
    console.log("addCart",cart)
    localStorage.setItem('cartData', JSON.stringify(cart));
    const obj = JSON.parse(localStorage.getItem('cartData') || '{}');
    // check if items in cart is empty
    if (!Object.keys(obj.items).length) {
      this.removeCartData();
    }else{
      this.cartDataSub.next(JSON.parse(this.getCartData()||'{}'));
    }
  }

  removeCartData() {
    if (localStorage.getItem('cartData')) {
      localStorage.removeItem('cartData');
    }
    this.cartDataSub.next(this.cartObj);
  }
  getCartData() {
    return localStorage.getItem('cartData');
  }
  getCartDataObservable() {
    this.cartDataSub.next(JSON.parse(this.getCartData() || '{}')== '{}' ?JSON.parse(this.getCartData() || '{}'):this.cartObj);
    return this.cartDataSub.asObservable();
  }
}
