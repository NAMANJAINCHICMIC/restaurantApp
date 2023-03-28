import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import {APIS} from 'src/app/utils/constants/link'

const AUTH_API = environment.AUTH_API;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userRole ?:string;
  constructor(private http: HttpClient , private router: Router) { }
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }

  storeResetToken(tokenValue:string){
    localStorage.setItem('resetToken',tokenValue)
  }

  getResetToken(){
    return localStorage.getItem('resetToken')
  }
  isNotLoggedIn():boolean{
    return !localStorage.getItem('token')
  }
  login(email: string| null | undefined, password: string| null | undefined): Observable<any> {
    return this.http.post(
      AUTH_API + APIS.AUTH.SIGN_IN,
      {
        email,
        password,
      }
     
    );
  }

  register(data:FormGroup): Observable<any> {
    return this.http.post(
      AUTH_API + APIS.AUTH.SIGN_UP,
   data.value
    );
  }
  forgetPassword(email: string| null | undefined): Observable<any> {
    return this.http.post(
      AUTH_API + APIS.AUTH.FORGOT_PASSWORD + '?email='+email,
      
      email
    );
  }

  resetPassword(otp: string| null | undefined,password: string| null | undefined,): Observable<any> {
    return this.http.post(
      AUTH_API + APIS.AUTH.RESET_PASSWORD,
      {otp,password},  
        {
        headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': "Bearer "+ localStorage.getItem('resetToken')
      
      })
      }
    );
  }
  changePassword(oldPassword: string| null | undefined,password: string| null | undefined): Observable<any> {
    return this.http.post(   
      AUTH_API + APIS.MAIN.CHANGE_PASSWORD,
     {
      oldPassword,password
     },    
    );
  }
  logout(): Observable<any> {
    return this.http.post(AUTH_API + APIS.AUTH.LOGOUT, { });
  }
  signOut(){
    this.logout().subscribe(
      (res:any)=>{
      console.log(res);
      alert(res.message);
      if (res.success){    
        localStorage.clear();
        this.router.navigate(['/']);
      }}
    );
  }
  // imageUpload(file: any): Observable<any> {
   
  //   return this.http.post(
  //     AUTH_API + APIS.MAIN.IMAGE_UPLOAD, file, 
  //   );
  // }
  // userProfile(){
  //   return this.http.get(
  //     AUTH_API + APIS.MAIN.VIEW_PROFILE  
  //   );
  // }
  // updateUserProfile(data:any):Observable<any>{
  //   return this.http.put(AUTH_API + APIS.MAIN.UPDATE_PROFILE , data)
  // }
}
