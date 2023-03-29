import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { APIS } from '../utils/constants/link';
import { Cart } from '../utils/models/cart';

const AUTH_API = environment.AUTH_API;

@Injectable({
  providedIn: 'root'
})
export class MainService {
  userRole ?:string;
  constructor(private http: HttpClient , private router: Router) { }

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
  addFood(data:any):Observable<any>{
    return this.http.post(AUTH_API + APIS.MAIN.ADD_fOOD , data)
  }
  addChef(data:FormGroup): Observable<any> {
    return this.http.post(
      AUTH_API + APIS.MAIN.ADD_CHEF,
   data.value
    );
  }
  getUsers(page:any){
    return this.http.get(
      AUTH_API + APIS.MAIN.GET_USERS+`?PageNumber=${page}`
    );
  }
  getFood(page:any){
    return this.http.get(
      AUTH_API + APIS.MAIN.GET_fOOD+`?PageNumber=${page}`
    );
  }
  getFoodByCategory(page:any,category:string){
    return this.http.get(
      AUTH_API + APIS.MAIN.GET_fOOD+`?PageNumber=${page}&category=${category}`
    );
  }



  //
  cartObj :any;
  addOrUpdate(item: any) {
    // get cart data from local storage
  

    // add cart object for the first time
    if (this.cartObj == null) {
      const cart: Cart = {
        items: {
            addedOn: new Date().toLocaleString(),
            quantity: item.quantity,
            itemId: item.id,
            category: item.category,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
          },
       
        totalAmt: item.price,
      };

      
    } else {
      // add a new item to cart
      if (this.cartObj.items[item.id] == undefined) {
        const itemD: any = {
          [item.id]: {
            addedOn: new Date().toLocaleString(),
            quantity: item.quantity,
            itemId: item.id,
            category: item.category,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
          },
        };

        // any better way?
        this.cartObj = {
          items: {
            ...this.cartObj.items,
            [item.id]: itemD[item.id],
          },
          totalAmt: this.getCartTotalAmount(item.price, true),
        };


      } else {
        // update quantity for existing item
        const itemD = this.cartObj.items[item.id];
        itemD.quantity += 1;
        this.cartObj.items[item.id] = itemD;

        // update total amount
        this.cartObj.totalAmt = this.getCartTotalAmount(item.price, true);


      }
    }
  }

  /** remove an item from cart */
  removeItem(item: any) {
    

    if (this.cartObj != null) {
      const itemD = this.cartObj.items[item.id];

      if (itemD.quantity > 1) {
        // decrease the quantity
        itemD.quantity -= 1;
        this.cartObj.items[item.id] = itemD;
      } else if (itemD.quantity == 1) {
        // when quantity is 1
        // remove the item
        delete this.cartObj.items[item.id];
      }

      this.cartObj.totalAmt = this.getCartTotalAmount(item.price, false);
    }


  }

  /** calculate total cart amount */
  getCartTotalAmount(price: number, add: boolean): number {
    let amt: number;

    if (add == true) {
      amt = Number(this.cartObj.totalAmt) + Number(price);
    } else {
      amt = Number(this.cartObj.totalAmt) - Number(price);
    }

    return amt;
  }

  /** check for cart data in local storage or Firebase */
 

  /** clear cart */
  clearCart() {
    this.cartObj = null;
    
  }

}
