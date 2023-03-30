import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';
import { PAGE } from 'src/app/utils/constants/link';
import { role } from 'src/app/utils/constants/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  ROLE =role
  constructor(public authService : AuthService ,public mainService: MainService, private router:Router, ){}

  
  signOut(){
    this.authService.signOut();
    }
    
    changePassword()
    {
      this.router.navigate([PAGE.CHANGE_PASSWORD]);
    
    }
    viewProfile(){
      this.router.navigate([PAGE.VIEW_PROFILE]);
    }
    updateProfile(){
      this.router.navigate([PAGE.UPDATE_PROFILE]);
    }
    homePage(){
      this.router.navigate([PAGE.HOME]);
    }
    cartPage(){
      this.router.navigate([PAGE.MY_CART]);
    }
    menuPage(){
      this.router.navigate([PAGE.MENU]);
    }
    ordersPage(){
      this.router.navigate([PAGE.ORDERS]);
    }
    addFoodPage(){
      this.router.navigate([PAGE.ADD_fOOD]);
    }
    addChefPage(){
      this.router.navigate([PAGE.ADD_CHEF]);
    }
    getUsers(){
      this.router.navigate([PAGE.VIEW_USERS])
    }
}
