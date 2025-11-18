import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuitemService {
    constructor(private http:HttpClient){}

    private baseUrl = 'http://localhost:3000/api'; // your Express backend URL
  
    getMenuItemList(id:number):Observable<any>{
      return this.http.get(`${this.baseUrl}/menuitem?category_id=${id}`);
    }
  
    createMenuItem(data:any):Observable<any>{
      return this.http.post(`${this.baseUrl}/menuitem`,data);
    }
  
    updateMenuItem(data:any,id:number):Observable<any>{
      return this.http.put(`${this.baseUrl}/menuitem/${id}`,data);
    }

    getAllMenuItemList(page:number,limit:number,id:number):Observable<any>{
      return this.http.get(`${this.baseUrl}/menuitem/getAllMenuItem?page=${page}&limit=${limit}`);
    }

    getAllShowMenuList(data:any):Observable<any>{
      return this.http.post(`${this.baseUrl}/showmenu`,data);
    }

}
