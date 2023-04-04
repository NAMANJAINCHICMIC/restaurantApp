import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { SocketService } from 'src/app/services/socket.service';
import { role } from 'src/app/utils/constants/role';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  role =role;
  orders: any;
  order:any
  orderArray: any = [];
  orderList:any;
  isLoading: boolean = true;
  isLoadingList: boolean = true;
  // isLoaded: boolean = false;
  isReady: boolean = this.socketService.isReady;
  page = 1;

  itemsPerPage = 20;
  totalItems : any; 
  constructor(public mainService : MainService , private socketService:SocketService){
    
  }
  ngOnInit(): void {
    this.mainService.userProfile().subscribe((res:any)=>{
      this.mainService.userRole =res?.data?.userRole

      if(this.mainService.userRole == role.user){

        this.userGetAllOrderDetail(this.page);
        this.isLoadingList =false;
      }
      if(this.mainService.userRole == role.admin){
      
        this.adminGetAllOrderDetail(this.page);
        this.isLoadingList =false;
        console.log("admin");
      }
  
    })
  
this.mainService.orderDetail.subscribe((res:any)=>{
 
  //  this.usersList =res?.data?.list
   console.log("orderPage",res);
   if(res){
     this.order=res
     this.isLoading =false;
    }
 });
  }
  getItemTotalAmount(price: number, quantity: number) {
    return Number(price) * Number(quantity);
  }
  confirmOrder(boolValue : boolean){
    const obj = {
      orderId:this.order.orderId,
      accepted:boolValue
    }
this.socketService.chefConfirmedOrder(obj);
if(!boolValue){
  this.isLoading =true;
}
this.isReady= this.socketService.isReady;
  }
  completeOrder(){
    this.socketService.chefCompleteOrder(this.order.orderId)
    this.isLoading =true;
    this.isReady= this.socketService.isReady;
  }

  userGetAllOrderDetail( page:number){
    this.page = page
    this.mainService.userGetAllOrderDetail(page).subscribe((res:any)=>{
      this.totalItems = res?.data?.totalAvailableRecords
       this.orderList =res?.data?.list
      //  if(this.orderList[0].orderId == this.order.orderId){
      //   this.orderList.shift()
      //  }
       console.log(res);
       this.isLoadingList= false;
       console.log("orderList",this.orderList);
    })
    
   }
  adminGetAllOrderDetail( page:number){
    this.page = page
    this.mainService.adminGetAllOrderDetail(page).subscribe((res:any)=>{
      this.totalItems = res?.data?.totalAvailableRecords
       this.orderList =res?.data?.list
       console.log(res);
       this.isLoadingList= false;
       console.log("orderList",this.orderList);
    })
    
   }
}
