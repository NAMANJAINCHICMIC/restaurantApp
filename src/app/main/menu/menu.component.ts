import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { CATEGORY } from 'src/app/utils/constants/role';
import { Cart } from 'src/app/utils/models/cart';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
 
  isLoading: boolean = true;
  isLoaded: boolean = false;

  // foodList :any;
  foodList :any;
  page = 1;

  itemsPerPage = 15;
  totalItems : any; 

    CATEGORY = CATEGORY;
    cartData ?:Cart|null;
  currentCategory =CATEGORY.STARTERS 

   constructor(private mainService : MainService){}
   ngOnInit(): void {
    this.getFoodByCategory(this.page,this.currentCategory)
   }

   getFood(){
    this.mainService.getFood(this.page).subscribe((res:any)=>{
      this.totalItems = res?.data?.totalAvailableRecords
      //  this.usersList =res?.data?.list
       console.log(res);
      //  console.log(this.usersList);
     })
   }
   getFoodByCategoryInit( page:number,category:string ){
    this.mainService.getFoodByCategory(page,category).subscribe((res:any)=>{
      this.totalItems = res?.data?.totalAvailableRecords
       this.foodList =res?.data?.list
       console.log(res);
       this.isLoading= false;
       this.isLoaded= true;
      //  console.log(this.foodList);
      this.mergeItemAndCartData()
    })
    
   }
   getFoodByCategory( page:number,category:string ){
    this.page = page
    this.currentCategory =category
    
    this.getFoodByCategoryInit(  this.page, this.currentCategory)
    
   }
   getFoodByPage( page:number){
    this.page = page
    this.getFoodByCategoryInit(  this.page, this.currentCategory)
    
   }

   fetchCartData() {
     this.cartData = this.mainService.getCartDataConverted();
   }
   
mergeItemAndCartData() {
  this.fetchCartData();

  for (let key in this.foodList) {
    let count = 0;
    const id = this.foodList[key]?.foodId;

    if (this.cartData != null) {
      const itemDetailsObj = this.cartData?.items[id];
      if (
        itemDetailsObj != undefined &&
        itemDetailsObj?.quantity != undefined
      ) {
        count = this.cartData?.items[id]?.quantity;
      }
    }
// console.log("run")
    this.foodList[key].quantity=count;
    // console.log(this.foodList)
  }}

  onAdd(item: any) {
    // console.log(item)
    item.quantity += 1; 
    this.mainService.addOrUpdate(item);    
  }

 
  onRemove(item: any) {
    item.quantity -= 1; 
    this.mainService.removeItem(item);
  }
}
