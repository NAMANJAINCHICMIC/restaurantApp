import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { PAGE } from 'src/app/utils/constants/link';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.scss']
})
export class CartFooterComponent  {
  isCartEmpty: boolean = false;
  totalAmt?: number;
  totalItems?: number;
  goToOrders: boolean = false;
  // hideCartBar: boolean = true;

  constructor(
    private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.mainService.getCartDataObservable().subscribe((data:any) => {
      // here data is cart data object
      // console.log("obs",Object.keys(data.items))
      if (data && Object.keys(data.items).length > 0) {
        // console.log("data",(data.items))
        this.isCartEmpty = true;
        this.totalAmt = data.totalAmt;
        this.totalItems = Object.keys(data.items).length;
      }else{
        this.isCartEmpty = false;
      }
      // if (!Object.keys(data.items).length) {
      //   // console.log("notdata")
      //   this.isCartEmpty = false;
      // }
    });
  }


  onContinue() {
    this.router.navigate([PAGE.MY_CART]);
  }

  // placeOrder() {
  //   this.router.navigate(['confirm-order']);
  // }
  cartDetails(){
    const data = this.mainService.cartObj
    console.log(data)
    if (data && Object.keys(data.items).length > 0) {
            this.isCartEmpty = true;
            this.totalAmt = data.totalAmt;
            this.totalItems = Object.keys(data.items).length;         
          }
          if (!data) {
            this.isCartEmpty = false;
          }
  }

}
