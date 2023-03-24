import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environment';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.scss']
})
export class AddFoodItemComponent implements OnInit{
  addFoodForm: FormGroup<{
    name: FormControl<string | null>,   
    price: FormControl<string | null>,
    // status: FormControl<string | null>,   
    category: FormControl<string | null>,   
    timeToPrepare: FormControl<any>,
    pathToPic: FormControl<string | null>
}>;
  foodItem:any;
  uploadImage : Blob | string=''
  imgPath='';
  picUpladed = false;
  showError= false;
  categories = [
    'Starters' ,
    'Main course',
    'Dessert',
    'Drinks',
  ]
  // visible=true;
  // validateDateOfbirth = false
  // viewPassword(){
  //   this.visible = !this.visible;
  // }

  constructor(private router: Router , private http: HttpClient,private authService: AuthService){
    this.addFoodForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required ]),
        price: new FormControl('',[ Validators.required ,Validators.pattern("[0-9]+")]),
        // status: new FormControl('',Validators.required ),
        category: new FormControl('',Validators.required ),
        timeToPrepare: new FormControl('',Validators.required ),
        pathToPic: new FormControl('', Validators.required ),
    
      }
    )
  }
  
  ngOnInit(): void {
    this.authService.userProfile().subscribe((res:any)=>{
      this.foodItem =res.data
      console.log(res);
      this.addFoodForm = new FormGroup(
        {
          // firstName: new FormControl(this.myself.firstName, [Validators.required , Validators.minLength(3)]),
          name: new FormControl(this.foodItem.name, [Validators.required ]),
        price: new FormControl(this.foodItem.price, Validators.required ),
        category: new FormControl(this.foodItem.category, Validators.required ),
        // status: new FormControl(this.foodItem.status,Validators.required ),
        timeToPrepare: new FormControl(this.foodItem.timeToPrepare,Validators.required ),
        pathToPic: new FormControl(this.foodItem.pathToPic, Validators.required ),
        }
      )
    })
    }
  

get controlName(){
  return this.addFoodForm.controls;
}

onSubmit(){
  if (this.addFoodForm.valid ) {
    console.log('form submitted');
  console.log(this.addFoodForm.value);
  this.authService.updateUserProfile(this.addFoodForm.value).subscribe(
    (res:any)=>{
      console.log(res)
      alert(res.message);
      if(res.success){

        this.router.navigate(['home']);
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

 this.authService.imageUpload(formData).subscribe((res:any)=>{
  console.log(res);
  this.addFoodForm.value.pathToPic =  environment.AUTH_API +res.data.pathToFile
this.picUpladed = true;
},
  (error:any) => {
    console.log('Upload error:', error);
  })

}
}
