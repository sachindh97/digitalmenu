import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
    private baseUrl = 'http://localhost:3000/api/auth'; // your Express backend URL
    constructor(private http:HttpClient){}
    private Token_Key = 'auth_token';

    userRegister(data: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/register`, data);
    }

    userLogin(data:any):Observable<any>{
      return this.http.post(`${this.baseUrl}/login`, data);
    }

    setToken(token:string){
      localStorage.setItem(this.Token_Key,token);
    }

    getToken(): string | null{
      return localStorage.getItem(this.Token_Key);
    }

    isLoggedIn():boolean {
      return !!localStorage.getItem(this.Token_Key);
    }

    removeToken(){
        localStorage.removeItem(this.Token_Key);
    }

 decodeToken() {
   const getTokenVal:any = localStorage.getItem('auth_token') 
  return JSON.parse(atob(getTokenVal.split('.')[1]));
}
    
}
