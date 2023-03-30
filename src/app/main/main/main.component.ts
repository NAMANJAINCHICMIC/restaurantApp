import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  tokenValue = localStorage.getItem('token');
  constructor(private mainService : MainService , private socketService : SocketService){}
ngOnInit(): void {
  this.mainService.userProfile().subscribe((res:any)=>{
    this.mainService.userRole =res?.data?.userRole
    // console.log(res);

  })

  this.socketService.initiateSignalrConnection(this.tokenValue);
}
}
