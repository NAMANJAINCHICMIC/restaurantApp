import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';
import { defaultImage, PAGE } from 'src/app/utils/constants/link';
import { environment } from 'src/environment';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{
  updateProfileForm: FormGroup<{
    firstName: FormControl<string | null>,
    lastName: FormControl<string | null>,
    // email: FormControl<string | null>,
    phone: FormControl<string | null>,
    address: FormControl<string | null>,
    pathToProfilePic: FormControl<string | null>
}>;
  myself:any;
  uploadImage : Blob | string=''
  imgPath='';
  visible=true;
  picUpladed = false;
  showError= false;
  defaultImage = defaultImage;
  viewPassword(){
    this.visible = !this.visible;
  }
  constructor(private router: Router , private http: HttpClient,private mainService: MainService){
    this.updateProfileForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required , Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required , Validators.minLength(3)]),
        // email: new FormControl('', [Validators.required,Validators.email]),
        phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern("^[6-9]\\d{9}$")]),
        address: new FormControl('',Validators.required ),
       
        pathToProfilePic:new FormControl('')
      }
    )
  }
  
  ngOnInit(): void {
    this.mainService.userProfile().subscribe((res:any)=>{
      this.myself =res.data
      console.log(res);
      this.updateProfileForm = new FormGroup(
        {
          firstName: new FormControl(this.myself.firstName, [Validators.required , Validators.minLength(3)]),
          lastName: new FormControl(this.myself.lastName, [Validators.required , Validators.minLength(3)]),
          // email: new FormControl(''),
          address: new FormControl(this.myself.address,Validators.required ),
          phone: new FormControl(this.myself.phone,[Validators.required , Validators.minLength(10),Validators.pattern("^[6-9]\\d{9}$")]),    
          pathToProfilePic:new FormControl(this.myself.pathToProfilePic)
        }
      )
    })
    }
  

get controlName(){
  return this.updateProfileForm.controls;
}

onSubmit(){
  if (this.updateProfileForm.valid ) {
    console.log('form submitted');

  const { firstName , lastName, phone, pathToProfilePic} = this.updateProfileForm.value
  console.log(this.updateProfileForm.value);
  // this.updateProfileForm.value.email="string";
  this.mainService.updateUserProfile(this.updateProfileForm.value).subscribe(
    (res:any)=>{
      console.log(res)
      alert(res.message);
      if(res.success){

        this.router.navigate([PAGE.HOME]);
      }
    }
  );

} else {
  console.log("show errors")
  this.showError = true;
}
}

imageUpload(event:any){
  this.uploadImage = event.target.files[0]
 const formData = new FormData()
  formData.append('file',this.uploadImage)

 this.mainService.imageUpload(formData).subscribe((res:any)=>{
  console.log(res);
  this.updateProfileForm.value.pathToProfilePic =  environment.AUTH_API +res.data.pathToPic
  this.picUpladed = true;
},
  (error:any) => {
    console.log('Upload error:', error);
  })

}
}