import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {

    private baseUrl = 'http://localhost:5000/api'; // your Express backend URL
    constructor(private http:HttpClient){}
 
    createRestaurant(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/restaurants`, data);
  }
}
