import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from './user-auth';
import { ICategory } from '../models/icategory';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiCategory {
  constructor(private _http:HttpClient,private _userAuthService:UserAuth){
  }
  getAllCategories():Observable<ICategory[]>{
      return this._http.get<ICategory[]>(`${environment.baseUrl}/categories`);
  }
  getCategoryById(id:Number):Observable<ICategory>{
    return this._http.get<ICategory>(`${environment.baseUrl}/categories/${id}`);
  }
  addCategory(newCategory:ICategory):Observable<ICategory>{
   return this._http.post<ICategory>(`${environment.baseUrl}/categories`,JSON.stringify(newCategory))
  }
  updateCategory(category:ICategory,id:number):Observable<ICategory>{
    return this._http.put<ICategory>(`${environment.baseUrl}/categories/${id}`,JSON.stringify(category))
  }
  deleteCategory(id:number):Observable<void>{
   return this._http.delete<void>(`${environment.baseUrl}/categories/${id}`)
  }
}
