import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';
import { defaultImage, PAGE } from 'src/app/utils/constants/link';
import { environment } from 'src/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  // uploadImage : Blob | string=''
  // imgPath='';
  visible=true;
  // picUploaded = false;
  showError= false;
  defaultImage = defaultImage
  viewPassword(){
    this.visible = !this.visible;
  }
  constructor(private router: Router , private http: HttpClient,private authService: AuthService , private  mainService: MainService){}
  

  registrationForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required , Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required , Validators.minLength(3)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern("^[6-9]\\d{9}$")]),
      address: new FormControl('',Validators.required ),
      password: new FormControl('',[Validators.required , Validators.minLength(8),Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
    
      // pathToProfilePic: new FormControl('', ),
    }
  )
get controlName(){
  return this.registrationForm.controls;
}
onClick(){
  this.router.navigate([PAGE.SIGN_IN]);
}
onSubmit(){
  if (this.registrationForm.valid ) {
    console.log('form submitted');
  console.log(this.registrationForm.value);
  this.authService.register(this.registrationForm).subscribe((res)=>{
        console.log(res)
        alert(res.message);
        if(res.success){
  
          this.registrationForm.reset();
          this.mainService.userRole = res.data.userRole;
          this.authService.storeToken(res.data.token);
          this.router.navigate([PAGE.HOME]);
        }
      })
} else {
  // validate all form fields
  console.log("show errors")
  this.showError = true;
}
}

}
// imageUpload(event:any){
//   this.uploadImage = event.target.files[0]
//  const formData = new FormData()
//   formData.append('file',this.uploadImage)

//  this.authService.imageUpload(formData).subscribe((res:any)=>{
//   console.log(res);
//   this.registrationForm.value.pathToProfilePic =  environment.AUTH_API +res.data.pathToPic
//   this.picUploaded = true;
  // PathToFileAttachment = AUTH_API + PathToFileAttachment;
  // this.imgPath = res.data
  // console.log(this.imgPath);
  // this.chatService.sendImage(this.chatService.receiverEmail,this.imgPath,2,this.content)
  // this.chatService.sendImage(this.chatService.receiverEmail,this.filePath)
// },
//   (error:any) => {
//     console.log('Upload error:', error);
//   })

// }

