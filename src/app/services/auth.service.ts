import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

const AUTH_API = environment.AUTH_API;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
  isLoggedIn():boolean{
    return !localStorage.getItem('token')
  }
  login(email: string| null | undefined, password: string| null | undefined): Observable<any> {
    return this.http.post(
      AUTH_API + 'api/v1/user/login',
      {
        email,
        password,
      }
     
    );
  }

  register(data:FormGroup): Observable<any> {
    return this.http.post(
      AUTH_API + 'api/v1/user/register',
   data.value
    );
  }
  forgetPassword(email: string| null | undefined): Observable<any> {
    return this.http.post(
      AUTH_API + 'api/v1/forgetPassword'+ '?email='+email,
      
      email
    );
  }
  verifyUser(data:any): Observable<any> {
    return this.http.post(
      AUTH_API + 'api/v1/verify',
      data,
     
    );
  }
  resetPassword(otp: string| null | undefined,password: string| null | undefined,): Observable<any> {
    return this.http.post(
      AUTH_API + 'api/v1/resetPassword',
      {otp,password},
    
    );
  }
  changePassword(oldPassword: string| null | undefined,password: string| null | undefined): Observable<any> {
    return this.http.post(
     
      AUTH_API + 'api/v1/changePassword',
     {
      oldPassword,password
     },
      
    );
  }
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'api/v1/user/logout', { });
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


  imageUpload(file: any): Observable<any> {

    const params = {
      type: 2,

    }
    return this.http.post(

      AUTH_API + 'api/v1/uploadFile', file, { params: params }
    );
  }
  userProfile(){
    return this.http.get(
      AUTH_API + 'api/v1/users/getYourself'  
    );
  }
  updateUserProfile(data:any):Observable<any>{
    return this.http.put(AUTH_API + 'api/v1/users/update', data)
  }
}
