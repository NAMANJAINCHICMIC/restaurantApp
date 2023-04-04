import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { SocketService } from 'src/app/services/socket.service';
import { defaultImage } from 'src/app/utils/constants/link';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  usersList :any;
  page = 1;
  onlineUsers: Array<any> = [];
  searchQuery = '';
  userRole : string = 'all';
  private searchSubject = new Subject<string | undefined>();
  
  private searchSubscription?: Subscription;
  itemsPerPage = 15;
  totalItems : any; 
  defaultImage = defaultImage;
   constructor(private mainService : MainService ,private socketService :SocketService){}
    ngOnInit(){
   this.getUsers(this.page)
   this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(900),
        distinctUntilChanged(),
        switchMap((searchQuery) => this.mainService.getUsersBySearch(searchQuery, this.userRole))
      )
      .subscribe((res:any) => {

        console.log(res);
        this.usersList =res?.data?.list
      });

   }
    getUsers(page:number, role: string= this.userRole){
   
    this.mainService.getUsers(this.page,role).subscribe((res:any)=>{
      this.totalItems = res?.data?.totalAvailableRecords
       this.usersList =res?.data?.list
      
       console.log(this.usersList);
       // Online user
       this.socketService.onlineUsers.subscribe( (res:any)=>{
        console.log("socketResponse",res);
        
        const onlineUsersId :any={};
        for (let key of res){
          onlineUsersId[key.userId]=1;
        }
        for(let key of this.usersList)
        {
          if(key.userId in onlineUsersId)
          {
            key.isActive=true;
          }
        }     
      });
     })

   }
   onSearchQueryInput(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
   this.searchSubject.next(this.searchQuery?.trim());
 }

 onchangeRole(event: Event){
  this.userRole = (event.target as HTMLSelectElement).value;
  this.getUsers(1,this.userRole)
 }
 onToggleBtn(userId:string){
  this.mainService.toggleBlock(userId).subscribe(
    (res:any)=>{
      console.log(res);     
    }
  );
 }

 
 }


//  this.searchSubscription = this.searchSubject
//       .pipe(
//         debounceTime(300),
//         distinctUntilChanged(),
//         switchMap((searchQuery) => this.chatService.searchUser(searchQuery))
//       )
//       .subscribe((res) => {

//         console.log(res);
//         if (res.success) {
//           if (res.message === "Users list fetched") {
//             this.userlist = true;
//             this.searchResults = res.data;
//           }
//           if (res.message === "No user found") {
//             console.log(res.message);
//           }
//         } else {

//           console.log("show errors")
//           // this.showError = true;
//         }
//         console.log("online",this.onlineConnectedUser)
//       });