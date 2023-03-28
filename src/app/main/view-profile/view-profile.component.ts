import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';
import {defaultImage} from 'src/app/utils/constants/link'
import { role } from 'src/app/utils/constants/role';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
    myself:any;
   defaultImage = defaultImage;
   role = role;
    constructor(private mainService : MainService){}
    ngOnInit(): void {
    this.mainService.userProfile().subscribe((res:any)=>{
      this.myself =res?.data
      console.log(res);
      // console.log(this.myself);
    })
    }
}
