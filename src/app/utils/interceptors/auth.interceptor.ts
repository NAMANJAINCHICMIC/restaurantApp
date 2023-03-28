import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router , private toastr: ToastrService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=localStorage.getItem('token');
        if (token) {
        req=req.clone({
          headers:req.headers.set('Authorization',`bearer ${token}`)
        })
        return next.handle(req)
        .pipe(catchError((error: HttpErrorResponse) => {
          if (error.status === 401  ) {
            alert('401 Unathurized');
            console.log("Unathurized")
           localStorage.clear()
           this.router.navigate(['/']);
          }else{
            // alert(error.statusText);
this.toastr.error('Error',error.statusText);
this.toastr.error(error.statusText, 'Error')
          }
    
          return throwError(error);
        }))
      } else {
        return next.handle(req);
      }
      }
  }


// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Router } from "@angular/router";
// import { catchError, Observable, throwError } from "rxjs";

// @Injectable()
// export class AuthInterceptors implements HttpInterceptor {
// constructor(private router: Router){}
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
      
//     const token=localStorage.getItem('token');
//     if (token) {
//     req=req.clone({
//       headers:req.headers.set('Authorization',`bearer ${token}`)
//     })
//     return next.handle(req)
//     .pipe(catchError((error: HttpErrorResponse) => {
//       if (error.status === 401  ) {
//         alert('401 Unathurized');
//         console.log("Unathurized")
//        localStorage.clear()
//        this.router.navigate(['/']);
//       }else{
//         alert(error.statusText);
//       }

//       return throwError(error);
//     }))
//   } else {
//     return next.handle(req);
//   }
//   }
// }