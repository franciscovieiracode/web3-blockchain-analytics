
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, throwError } from 'rxjs';

const endpoint = 'https://localhost:7280/api/Auth/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router:Router) { }


  login(username:string, password:string):Observable<any>{

    return this.http.post<any>(endpoint+"login", new LoginModel(username, password)).pipe(catchError(this.handleError));
  }

  register(firstName:string, lastName:string, email:string,password:string,passwordConfirmation:string,test:string):Observable<any>{
    return this.http.post<any>(endpoint+"register", new RegisterModel(firstName, lastName,email,password,passwordConfirmation,test)).pipe(catchError(this.handleError));
  }


  
  handleError(error:HttpErrorResponse) {
    return throwError(() => {
        return error;
    });
  }
}

export class RegisterModel{
  constructor(public firstName:string, public lastName:string, public email:string,
    public password:string,public passwordConfirmation:string, public test:string ){}
}

export class LoginModel{

  constructor(public Email:string, public Password:string){}

}
