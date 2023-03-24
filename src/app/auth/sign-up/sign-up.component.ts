import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  uploadImage : Blob | string=''
  imgPath='';
  visible=true;
  picUpladed = false;
  showError= false;
  validateDateOfbirth = false
  viewPassword(){
    this.visible = !this.visible;
  }
  constructor(private router: Router , private http: HttpClient,private authService: AuthService){}
  

  registrationForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required , Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required , Validators.minLength(3)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern("^[6-9]\\d{9}$")]),
      address: new FormControl('',Validators.required ),
      password: new FormControl('',[Validators.required , Validators.minLength(8),Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
      dateOfBirth: new FormControl('', Validators.required ),
      pathToProfilePic: new FormControl('', ),
    }
  )
get controlName(){
  return this.registrationForm.controls;
}
onClick(){
  this.router.navigateByUrl("/sign-in");
}
onSubmit(){
  if (this.registrationForm.valid && !this.validateDateOfbirth) {
    console.log('form submitted');
  console.log(this.registrationForm.value);
  this.authService.register(this.registrationForm).subscribe((res)=>{
        console.log(res)
        alert(res.message);
        if(res.success){
  
          this.registrationForm.reset();
          this.authService.storeToken(res.data.token);

          this.router.navigate(['home']);
        }
      })
} else {
  // validate all form fields
  console.log("show errors")
  this.showError = true;
}
}
validateDOB(e: Event){
 
  const year = new Date((e.target as HTMLInputElement).value).getFullYear();
  const today = new Date().getFullYear();

  if( (today-year) < 12 || (today -year)>100){

    this.validateDateOfbirth= true

  }else{
    this.validateDateOfbirth = false
  }
}

imageUpload(event:any){
  this.uploadImage = event.target.files[0]
 const formData = new FormData()
  formData.append('file',this.uploadImage)

 this.authService.imageUpload(formData).subscribe((res:any)=>{
  console.log(res);
  this.registrationForm.value.pathToProfilePic =  environment.AUTH_API +res.data.pathToFile
  this.picUpladed = true;
  // PathToFileAttachment = AUTH_API + PathToFileAttachment;
  // this.imgPath = res.data
  // console.log(this.imgPath);
  // this.chatService.sendImage(this.chatService.receiverEmail,this.imgPath,2,this.content)
  // this.chatService.sendImage(this.chatService.receiverEmail,this.filePath)
},
  (error:any) => {
    console.log('Upload error:', error);
  })

}

}
