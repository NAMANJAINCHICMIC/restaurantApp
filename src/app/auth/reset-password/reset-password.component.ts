import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PAGE } from 'src/app/utils/constants/link';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  showError= false;

  constructor(private router: Router,private authService: AuthService ){}
  resetForm = new FormGroup(
    { otp:new FormControl('', [Validators.required , Validators.minLength(6),Validators.maxLength(6),]),
      password: new FormControl('',[Validators.required , Validators.minLength(8),Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
      confirmPassword: new FormControl('',[Validators.required , Validators.minLength(8),Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
     
    }
  )
get controlName(){
  return this.resetForm.controls;
}

visibleNewPassword=true;
visibleConfirmPassword=true;

viewNewPassword(){
  this.visibleNewPassword = !this.visibleNewPassword;
}
viewConfirmPassword(){
  this.visibleConfirmPassword = !this.visibleConfirmPassword;
}
onSubmit(){
  if (this.resetForm.valid) {
    console.log('form submitted');

  const { otp ,password, confirmPassword} = this.resetForm.value
  console.log( this.authService.getToken())
  console.log(this.resetForm.value);
  // this.http.post('http://192.180.2.159:4040/api/v1/RegisterUser',this.registrationForm.value)
  this.authService.resetPassword(otp ,password).subscribe(
    (res :any)=>{
    console.log(res);
    alert(res.message);
    if (res.success){ 
    this.resetForm.reset();
    localStorage.removeItem('resetToken');
    this.authService.storeToken(res.data.token);
    this.router.navigate([PAGE.HOME]);
    }}
  );
  // this.authService.register(this.registrationForm.value).subscribe();
} else {
  // validate all form fields
  console.log("show errors")
  this.showError = true;
}
}
checkPasswords(pw: string, cpw: string) {
  this.isConfirmPasswordDirty = true;
  if (pw == cpw) {
    this.passwordsMatching = true;
    this.confirmPasswordClass = 'form-control is-valid';
  } else {
    this.passwordsMatching = false;
    this.confirmPasswordClass = 'form-control is-invalid';
  }
}

}
