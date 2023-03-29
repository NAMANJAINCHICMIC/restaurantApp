import { Component } from '@angular/core';

import {  Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { PAGE } from 'src/app/utils/constants/link';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {


  showError = false;
  constructor(private http: HttpClient,private toastr: ToastrService , private router: Router, private authService: AuthService , private  mainService: MainService) {

  }
  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required , Validators.minLength(8),Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
    }
  )


  get controlName() {
    return this.loginForm.controls;
  }
  onClick() {
    this.router.navigate([PAGE.SIGN_UP]);
  }
  onClickForget() {
    this.router.navigate([PAGE.FORGOT_PASSWORD]);
  }


  onSubmit() {
    if (this.loginForm.valid) {
      console.log('form submitted');

      const { email, password } = this.loginForm.value
      console.log(this.loginForm.value);
 
      this.authService.login(email, password).subscribe(
        (res:any) => {
          this.toastr.info(res.message);
          console.log(res);
          if (res.success) {

            this.loginForm.reset();
            this.mainService.userRole = res.data.userRole;
            this.authService.storeToken(res.data.token);
     
            this.router.navigate([PAGE.HOME]);
          }
        }
      );

    } else {

      console.log("show errors")
      this.showError = true;
    }

  }
  visible = true;
  viewPassword() {
    this.visible = !this.visible;
  }


}
