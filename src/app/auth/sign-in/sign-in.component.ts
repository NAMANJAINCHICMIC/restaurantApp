import { Component } from '@angular/core';

import {  Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient,  HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {


  showError = false;
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {

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
    this.router.navigateByUrl("/sign-up");
  }
  onClickForget() {
    this.router.navigateByUrl("/forget-password");
  }


  onSubmit() {
    if (this.loginForm.valid) {
      console.log('form submitted');

      const { email, password } = this.loginForm.value
      console.log(this.loginForm.value);
 
      this.authService.login(email, password).subscribe(
        (res:any) => {
          console.log(res);
          alert(res.message);
          if (res.success) {

            this.loginForm.reset();
            this.authService.storeToken(res.data.token);
     
            this.router.navigate(['home']);
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
