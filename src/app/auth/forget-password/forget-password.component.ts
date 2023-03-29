import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { PAGE } from 'src/app/utils/constants/link';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  showError= false;
  constructor(private router: Router,private toastr: ToastrService ,private authService: AuthService ){}
  forgetForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required,Validators.email]),
    }
  )
get controlName(){
  return this.forgetForm.controls;
}
onSubmit(){
  if (this.forgetForm.valid) {

  const { email} = this.forgetForm.value

  // this.http.post('http://192.180.2.159:4040/api/v1/RegisterUser',this.registrationForm.value)
  this.authService.forgetPassword(email).subscribe(
    (res:any)=>{
   
    this.toastr.info(res.message);
    if(res.success){

    this.forgetForm.reset();
    this.authService.storeResetToken(res.data.token );
    this.router.navigate([PAGE.RESET_PASSWORD]);
    }
    }
  );
  // this.authService.register(this.registrationForm.value).subscribe();
} else {
  // validate all form fields
  console.log("show errors")
  this.showError = true;
}
}
}
