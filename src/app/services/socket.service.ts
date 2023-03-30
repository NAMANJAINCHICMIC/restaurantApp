import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public hubConnection: signalR.HubConnection | any;
  onlineUsers: Array<any> = [];
  constructor() { }

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
  console.log(message);
  });
  this.hubConnection.on('UserOrderStatus', (order:any) => {
    // user gets status of his order
  console.log(order);
  });
  this.hubConnection.on('MessageError', (error: string) => {
  //don't show this to user
  console.log(error);
  });
  this.hubConnection.on('ChefReceivedOrder', (orderOutput:any) => {
    // random chef receives order from server
  console.log(orderOutput);
  });
  this.hubConnection.on('UpdateFood', (food:any) => {
    // changed status of food is updated here
  console.log(food);
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
}
chefCompleteOrder(orderId:string){
  this.hubConnection?.send("ChefCompleteOrder", orderId).catch((error: any) => {
    console.log('error of ChefCompleteOrder');
  });
}
chefChangeFoodStatus(changeFoodStatus:any){
  // changeFoodStatus -- is { Guid/string - foodId:"",  bool status:t/f}
  this.hubConnection?.send("ChefChangeFoodStatus", changeFoodStatus).catch((error: any) => {
    console.log('error of ChefChangeFoodStatus');
  });
}
}
