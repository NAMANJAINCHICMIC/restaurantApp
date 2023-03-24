import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
    myself:any;
   
    constructor(private authService : AuthService){}
    ngOnInit(): void {
    this.authService.userProfile().subscribe((res:any)=>{
      this.myself =res.data
      console.log(res);
      console.log(this.myself);
    })
    }
}
