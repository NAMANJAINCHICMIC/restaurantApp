import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  starters: any[] = [];
  mains: any[] = [];
  alcoholicBeverages: any[] = [];
  desserts: any[] = [];

  isLoading: boolean = true;
  isLoaded: boolean = false;
  onAdd(data:any){}
  onRemove(data:any){}
  foodList :any;
  _foodList :any;
  page = 1;

  itemsPerPage = 15;
  totalItems : any; 

   constructor(private mainService : MainService){}
   ngOnInit(): void {
    this.getFoodByCategory('Starters')
   }

   getFood(){
    this.mainService.getFood(this.page).subscribe((res:any)=>{
      this.totalItems = res?.data?.totalAvailableRecords
      //  this.usersList =res?.data?.list
       console.log(res);
      //  console.log(this.usersList);
     })
   }
   getFoodByCategory(category:string){

    this.mainService.getFoodByCategory(this.page,category).subscribe((res:any)=>{
      this.totalItems = res?.data?.totalAvailableRecords
       this._foodList =res?.data?.list
       console.log(res);
       this.isLoading= false;
       this.isLoaded= true;
      //  console.log(this.foodList);
     })

   }

   cartData :any
   fetchCartData() {
     this.cartData = this.mainService.cartObj
   }
   
mergeItemAndCartData() {
  this.fetchCartData();

  for (let key in this._foodList) {
    let count = 0;
    const id = this._foodList[key].id;

    if (this.cartData != null) {
      const itemDetailsObj = this.cartData.items[id];
      if (
        itemDetailsObj != undefined &&
        itemDetailsObj.quantity != undefined
      ) {
        count = this.cartData.items[id].quantity;
      }
    }

    this.foodList[key] = { ...this._foodList[key], quantity: count };
  }}
}
