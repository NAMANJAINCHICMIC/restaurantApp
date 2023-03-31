import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environment';
import { ToastrService } from 'ngx-toastr';
import { MainService } from './main.service';
import { role } from '../utils/constants/role';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public hubConnection: signalR.HubConnection | any;
  onlineUsers: Array<any> = [];
  isReady = false;
  foodUpdated = new Subject<any>;
  constructor(private toastr: ToastrService , private mainService : MainService) { }

  stopChatConnection() {
    this.hubConnection?.stop().catch((error: any) => console.log(error));
  }
  public async initiateSignalrConnection(token: any): Promise<void> {
    try {

      this.hubConnection = new HubConnectionBuilder()
        .withUrl(environment.AUTH_API + "foodHub",
          { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets, accessTokenFactory: () => token })
        .withAutomaticReconnect().build();
      await this.hubConnection.start();
      console.log("connection started");

      // this.sendMessageListener();
      this.foodHubListener()
    }
    catch (err: any) {
      console.log("Error while starting connection", err);
      // setTimeout(() => {
      //   this.startConnection(token);
      // }, 2000)
    }
  }
foodHubListener(){
  this.hubConnection.on('GetOnlineUsers', () => {
  //call function to get online users list
  this.hubConnection?.send("OnlineUsers").catch((error: any) => {
    console.log('error of OnlineUsers');
  });
  });
  this.hubConnection.on('UpdateOnlineUsers', (onlineUsers: any) => {
    //this function gets online users list in response
    this.onlineUsers = [...onlineUsers];
    console.log("onlineUsers", onlineUsers);
  });
  this.hubConnection.on('Message', (message:string) => {
  // this function is used to show incoming messages to user
  this.toastr.info(message);
  console.log(message);
  });
  this.hubConnection.on('UserOrderStatus', (order:any) => {
    // user gets status of his order
    // this.toastr.info(order);
    this.mainService.userGetOrderDetail(order?.orderId);
  console.log(order);
  });
  this.hubConnection.on('MessageError', (error: string) => {
  //don't show this to user
  console.log(error);
  });
  this.hubConnection.on('ChefReceivedOrder', (orderOutput:any) => {
    // random chef receives order from server
    if(this.mainService.userRole == role.chef){
      this.toastr.info("New Order Recieved");
this.mainService.chefGetOrderDetail(orderOutput?.orderId);
    }
    
  console.log(orderOutput);
  });
  this.hubConnection.on('UpdateFoods', (food:any) => {
    // changed status of food is updated here
  console.log("update ",food);
  this.foodUpdated.next(food);
  });

  
}
userPlaceOrder(placeOrder:any){
  // placeOrder -- is {[{  Guid/string - foodId:"", int- quantity:},{}]}
  this.hubConnection?.send("UserPlaceOrder", placeOrder).catch((error: any) => {
    console.log('error of UserPlaceOrder');
  });
}
chefConfirmedOrder(chefConfirmOrder:any){
  // chefConfirmOrder -- is { Guid/string - orderId:"" , bool - accepted: t/f }
  this.hubConnection?.send("ChefConfirmOrder", chefConfirmOrder).catch((error: any) => {
    console.log('error of ChefConfirmOrder');
  });
  this.isReady=true
}
chefCompleteOrder(orderId:string){
  this.hubConnection?.send("ChefCompletesOrder", orderId).catch((error: any) => {
    console.log('error of ChefCompleteOrder');
  });
  this.isReady=false;
  console.log('ChefCompleteOrder');
}
chefChangeFoodStatus(changeFoodStatus:any){
  // changeFoodStatus -- is { Guid/string - foodId:"",  bool status:t/f}
  this.hubConnection?.send("ChefChangeFoodStatus", changeFoodStatus).catch((error: any) => {
    console.log('error of ChefChangeFoodStatus');
  });
}
}
