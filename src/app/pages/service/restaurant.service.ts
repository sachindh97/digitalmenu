import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RestaurantIntFace {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    phone?:number;
    address?:string;
}

@Injectable({
  providedIn: 'root'
})

export class RestaurantSerivce {
  constructor(private http:HttpClient){}

    private baseUrl = 'http://localhost:3000/api'; // your Express backend URL

  

  getRestaurantList(page:any,limit:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/restaurant?page=${page}&limit=${limit}`);
  }

  createRestaurant(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/restaurant`,data);
  }

  updateRestaurant(data:any,id:number):Observable<any>{
    return this.http.put(`${this.baseUrl}/restaurant/${id}`,data);
  }

  getAllRestaurantLookup():Observable<any>{
    return this.http.get(`${this.baseUrl}/restaurant/restaurantLookup`);
  }

  deleteRestaurant(id:any):Observable<any>{
    return this.http.delete(`${this.baseUrl}/restaurant/${id}`);
  }

}
