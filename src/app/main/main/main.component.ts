import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private mainService : MainService){}
ngOnInit(): void {
  this.mainService.userProfile().subscribe((res:any)=>{
    this.mainService.userRole =res?.data?.userRole
    // console.log(res);

  })
}
}
