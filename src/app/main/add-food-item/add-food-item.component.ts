import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';
import { PAGE } from 'src/app/utils/constants/link';
import { environment } from 'src/environment';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.scss']
})
export class AddFoodItemComponent {
//   addFoodForm: FormGroup<{
//     foodName: FormControl<string | null>,   
//     price: FormControl<string | null>,
//     // status: FormControl<string | null>,   
//     category: FormControl<string | null>,   
//     timeToPrepare: FormControl<string | null>,
//     pathToPic: FormControl<string | null>
// }>;
  foodItem:any;
  uploadImage : Blob | string=''
  // imgPath='';
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

  constructor(private router: Router , private http: HttpClient,private mainService: MainService){
    // this.addFoodForm = new FormGroup(
    //   {
    //     foodName: new FormControl('', [Validators.required ]),
    //     price: new FormControl('',[ Validators.required ]),
    //     // status: new FormControl('',Validators.required ),
    //     category: new FormControl('',Validators.required ),
    //     timeToPrepare: new FormControl('',[Validators.required ]),
    //     pathToPic: new FormControl('', Validators.required ),
    
    //   }
    // )
  }
  
  // ngOnInit(): void {
    // this.mainService.userProfile().subscribe((res:any)=>{
    //   this.foodItem =res.data
    //   console.log(res);
    //   // this.addFoodForm = new FormGroup(
    //   //   {
    //   //     // firstName: new FormControl(this.myself.firstName, [Validators.required , Validators.minLength(3)]),
    //   //     foodName: new FormControl(this.foodItem.foodName, [Validators.required ]),
    //   //   price: new FormControl(this.foodItem.price, Validators.required ),
    //   //   category: new FormControl(this.foodItem.category, Validators.required ),
    //   //   // status: new FormControl(this.foodItem.status,Validators.required ),
    //   //   timeToPrepare: new FormControl(this.foodItem.timeToPrepare,Validators.required ),
    //   //   pathToPic: new FormControl(this.foodItem.pathToPic, Validators.required ),
    //   //   }
    //   // )
    // })
    // }
  
    addFoodForm = new FormGroup(
        {
       
          foodName: new FormControl('', [Validators.required ]),
        price: new FormControl('',[ Validators.required ]),
     
        category: new FormControl('',Validators.required ),
        timeToPrepare: new FormControl('',[Validators.required ]),
        pathToPic: new FormControl('', Validators.required ),
        }
      )
get controlName(){
  return this.addFoodForm.controls;
}

onSubmit(){
  if (this.addFoodForm.valid ) {
    console.log('form submitted');
  console.log(this.addFoodForm.value);
  this.mainService.addFood(this.addFoodForm.value).subscribe(
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

 this.mainService.foodImageUpload(formData).subscribe((res:any)=>{
  // console.log(res.data.pathToPic);
  // this.addFoodForm.value.pathToPic =  environment.AUTH_API +res.data.pathToPic
  this.addFoodForm.controls['pathToPic'].patchValue(`${environment.AUTH_API}${res.data?.pathToPic}`)
this.picUpladed = true;
},
  (error:any) => {
    console.log('Upload error:', error);
  })

}
}
