import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { defaultImage } from 'src/app/utils/constants/link';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  usersList :any;
  page = 1;

  itemsPerPage = 15;
  totalItems : any; 
  defaultImage = defaultImage;
   constructor(private mainService : MainService){}
   ngOnInit(): void {
   this.getUsers(this.page)
   }
   getUsers(page:number){
    // this.page =page
    this.mainService.getUsers(this.page).subscribe((res:any)=>{
      this.totalItems = res?.data?.totalAvailableRecords
       this.usersList =res?.data?.list
       console.log(res);
       console.log(this.usersList);
     })
   }
 }