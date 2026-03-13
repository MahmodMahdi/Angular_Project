import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';
import { environment } from '../../environments/environment.development';
import { UserAuth } from './user-auth';

@Injectable({
  providedIn: 'root',
})
export class ApiProducts {
  constructor(private _http:HttpClient,private _userAuthService:UserAuth){
  }
  getAllProducts():Observable<IProduct[]>{

    // send header with request
    // return this._http.get<IProduct[]>(`${environment.baseUrl}/products`,
    //   {headers: new HttpHeaders({
    //   "authorization":this._userAuthService.getToken()
    // })
      return this._http.get<IProduct[]>(`${environment.baseUrl}/products`);
  }
  getProductById(id:number):Observable<IProduct>{
    return this._http.get<IProduct>(`${environment.baseUrl}/products/${id}`);
  }
  getProductsByCategoryId(categoryId:number):Observable<IProduct[]>{
    // return this._http.get<IProduct[]>(`${environment.baseUrl}/products?categoryId=${categoryId}`)
    
    //send query string with params not in url
    let query=new HttpParams()
     query = query.append("categoryId",categoryId)
     //search = search.append('limit',5)
     return this._http.get<IProduct[]>(`${environment.baseUrl}/products`,{
     params:query
    // params:new HttpParams().set("categoryId",categoryId)
  })

  }
  addProduct(newProduct:IProduct):Observable<IProduct>{
   return this._http.post<IProduct>(`${environment.baseUrl}/products`,JSON.stringify(newProduct))
  }
  updateProduct(product:IProduct,id:number):Observable<IProduct>{
    return this._http.put<IProduct>(`${environment.baseUrl}/products/${id}`,JSON.stringify(product))
  }
  deleteProduct(id:number):Observable<void>{
   return this._http.delete<void>(`${environment.baseUrl}/products/${id}`)
  }
}

