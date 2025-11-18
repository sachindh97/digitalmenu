import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  constructor(private http:HttpClient){}

    private baseUrl = 'http://localhost:3000/api'; // your Express backend URL
  
    getCategoriesList(id:any):Observable<any>{
      return this.http.get(`${this.baseUrl}/categories?restaurant_id=${id}`);
    }
  
    createCategories(data:any):Observable<any>{
      return this.http.post(`${this.baseUrl}/categories`,data);
    }
  
    updateCategories(data:any,id:number):Observable<any>{
      return this.http.put(`${this.baseUrl}/categories/${id}`,data);
    }

    getAllCategoriesList(page:number,limit:number,id:number):Observable<any>{
      return this.http.get(`${this.baseUrl}/categories/allCategoriesList?page=${page}&limit=${limit}`);
    }


  }
