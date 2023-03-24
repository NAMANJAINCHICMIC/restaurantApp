import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  showError= false;
  constructor(private router: Router,private authService: AuthService ){}
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
    console.log('form submitted');
  const { email} = this.forgetForm.value
  console.log(this.forgetForm.value);
  // this.http.post('http://192.180.2.159:4040/api/v1/RegisterUser',this.registrationForm.value)
  this.authService.forgetPassword(email).subscribe(
    (res:any)=>{
    console.log(res);
    alert(res.message);
    if(res.success){

    this.forgetForm.reset();
    this.authService.storeResetToken(res.data.token );
    this.router.navigate(['reset-password']);
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
