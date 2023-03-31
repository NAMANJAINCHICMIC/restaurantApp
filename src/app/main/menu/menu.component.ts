import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { SocketService } from 'src/app/services/socket.service';
import { CATEGORY, role } from 'src/app/utils/constants/role';
import { Cart } from 'src/app/utils/models/cart';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
 
  isLoading: boolean = true;
  isLoaded: boolean = false;
  isChecked: boolean = false;
  updatedFoodId?:string
  updatedFoodStatus?:boolean
  // foodList :any;
  foodList :any;
  page = 1;
  role = role;
  itemsPerPage = 15;
  totalItems : any; 

    CATEGORY = CATEGORY;
    cartData ?:Cart|null;
  currentCategory =CATEGORY.STARTERS 

   constructor(public mainService : MainService , private socketService : SocketService){}
   ngOnInit(): void {
    this.getFoodByCategory(this.page,this.currentCategory);
    this.socketService.foodUpdated.subscribe((res:any)=>{
      console.log(res);
      this.updatedFoodId = res.foodId
      this.updatedFoodStatus = res.status
      this.updateStatus()
    })
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
       console.log(this.foodList);
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

    if (this.cartData) {
      const itemDetailsObj = this.cartData?.items[id];
      if (
        itemDetailsObj?.quantity 
      ) {
        count = this.cartData?.items[id]?.quantity;
      }
    }
// console.log("run")
    this.foodList[key].quantity=count;
    // console.log(this.foodList)
  }}
  updateStatus(){
    for (let key in this.foodList) {
      if(this.foodList[key]?.foodId == this.updatedFoodId){
        this.foodList[key].status = this.updatedFoodStatus
        console.log("res");
      }
    }

  }

  onAdd(item: any) {
    // console.log(item)
    item.quantity += 1; 
    this.mainService.addOrUpdate(item);    
  }

 
  onRemove(item: any) {
    item.quantity -= 1; 
    this.mainService.removeItem(item);
  }

  foodStatus(boolValue : boolean, foodId :string){
    const obj = {
      foodId:foodId,
      status:boolValue
    }
this.socketService.chefChangeFoodStatus(obj);
console.log("status")
  }
}
