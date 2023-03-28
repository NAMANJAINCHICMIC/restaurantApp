import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { APIS } from '../utils/constants/link';

const AUTH_API = environment.AUTH_API;

@Injectable({
  providedIn: 'root'
})
export class MainService {
  userRole ?:string;
  constructor(private http: HttpClient , private router: Router) { }

   imageUpload(file: any): Observable<any> {
   
    return this.http.post(
      AUTH_API + APIS.MAIN.IMAGE_UPLOAD, file, 
    );
  }
   foodImageUpload(file: any): Observable<any> {
   
    return this.http.post(
      AUTH_API + APIS.MAIN.FOOD_IMAGE_UPLOAD, file, 
    );
  }
  userProfile(){
    return this.http.get(
      AUTH_API + APIS.MAIN.VIEW_PROFILE  
    );
  }
  updateUserProfile(data:any):Observable<any>{
    return this.http.put(AUTH_API + APIS.MAIN.UPDATE_PROFILE , data)
  }
  addFood(data:any):Observable<any>{
    return this.http.post(AUTH_API + APIS.MAIN.ADD_fOOD , data)
  }
}
