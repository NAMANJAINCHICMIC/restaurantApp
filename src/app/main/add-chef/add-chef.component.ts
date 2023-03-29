import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';
import { defaultImage, PAGE } from 'src/app/utils/constants/link';
import { environment } from 'src/environment';

@Component({
  selector: 'app-add-chef',
  templateUrl: './add-chef.component.html',
  styleUrls: ['./add-chef.component.scss']
})
export class AddChefComponent {
//   chefProfileForm: FormGroup<{
//     firstName: FormControl<string | null>,
//     lastName: FormControl<string | null>,
//     email: FormControl<string | null>,
//     phone: FormControl<string | null>,
//     address: FormControl<string | null>,
   
//     dateOfBirth: FormControl<any>,
//     pathToProfilePic: FormControl<string | null>
// }>;
  myself:any;
  uploadImage : Blob | string=''
  imgPath='';
  visible=true;
  showError= false;
  validateDateOfbirth = false
  viewPassword(){
    this.visible = !this.visible;
  }
  defaultImage = defaultImage
  constructor(private router: Router ,private toastr: ToastrService , private http: HttpClient,private mainService: MainService){
    // this.chefProfileForm = new FormGroup(
    //   {
    //     firstName: new FormControl('', [Validators.required , Validators.minLength(3)]),
    //     lastName: new FormControl('', [Validators.required , Validators.minLength(3)]),
    //     email: new FormControl('', [Validators.required,Validators.email]),
    //     phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern("^[6-9]\\d{9}$")]),
    //     address: new FormControl('',Validators.required ),
    //     dateOfBirth: new FormControl('', Validators.required ),
    //     pathToProfilePic:new FormControl('')
    //   }
    // )
  }
  
  // ngOnInit(): void {
  //   this.mainService.userProfile().subscribe((res:any)=>{
  //     this.myself =res.data
  //     console.log(res);
  //     this.chefProfileForm = new FormGroup(
  //       {
  //         firstName: new FormControl(this.myself.firstName, [Validators.required , Validators.minLength(3)]),
  //         lastName: new FormControl(this.myself.lastName, [Validators.required , Validators.minLength(3)]),
  //         email: new FormControl(this.myself.email, [Validators.required,Validators.email]),
  //         address: new FormControl(this.myself.address,Validators.required ),
  //         phone: new FormControl(this.myself.phone,[Validators.required , Validators.minLength(10),Validators.pattern("^[6-9]\\d{9}$")]),
  //         dateOfBirth: new FormControl(this.myself.dateOfBirth),
  //         pathToProfilePic:new FormControl(this.myself.pathToProfilePic)
  //       }
  //     )
  //   })
  //   }
  
  chefProfileForm = new FormGroup(
    {
          firstName: new FormControl('', [Validators.required , Validators.minLength(3)]),
          lastName: new FormControl('', [Validators.required , Validators.minLength(3)]),
          email: new FormControl('', [Validators.required,Validators.email]),
          phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern("^[6-9]\\d{9}$")]),
          address: new FormControl('',Validators.required ),
          password: new FormControl('',[Validators.required , Validators.minLength(8),Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
          pathToProfilePic:new FormControl('')
        }
        )
get controlName(){
  return this.chefProfileForm.controls;
}

onSubmit(){
  if (this.chefProfileForm.valid ) {


  
  console.log(this.chefProfileForm.value);
  // this.chefProfileForm.value.email="string";
  this.mainService.addChef(this.chefProfileForm).subscribe(
    (res:any)=>{
      this.toastr.info(res.message);
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
  // this.chefProfileForm.value.pathToProfilePic =  environment.AUTH_API +res.data?.pathToPic
  // this.addFoodForm.controls['pathToPic'].patchValue(`${environment.AUTH_API}${res.data?.pathToPic}`)
  this.chefProfileForm.controls['pathToProfilePic'].patchValue(`${environment.AUTH_API}${res.data?.pathToPic}`)

},
  (error:any) => {
    console.log('Upload error:', error);
  })

}
}