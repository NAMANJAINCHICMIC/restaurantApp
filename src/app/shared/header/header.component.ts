import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService : AuthService , private router:Router, ){}
  signOut(){
    this.authService.signOut();
    }
    
    changePassword()
    {
      this.router.navigate(['change-password']);
    
    }
    viewProfile(){
      this.router.navigate(['view-profile']);
    }
    updateProfile(){
      this.router.navigate(['update-profile']);
    }
    homePage(){
      this.router.navigate(['home']);
    }
    cartPage(){
      this.router.navigate(['my-cart']);
    }
    menuPage(){
      this.router.navigate(['menu']);
    }
    ordersPage(){
      this.router.navigate(['orders']);
    }
    addFoodPage(){
      this.router.navigate(['add-food']);
    }
    addChefPage(){
      this.router.navigate(['add-chef']);
    }
}
