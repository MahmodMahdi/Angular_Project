import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class StaticProducts {
  products:IProduct[];
  constructor(){
  this.products = [
            { id: 1, name: 'Product 1', price: 100,imageUrl:'Images/4.jpg', description: 'Description for Product 1', quantity: 1, categoryId: 1 },
            { id: 2, name: 'Product 2', price: 200,imageUrl:'Images/2.jpg', description: 'Description for Product 2', quantity: 20, categoryId: 1 },
            { id: 3, name: 'Product 3', price: 300,imageUrl:'Images/3.jpg', description: 'Description for Product 3', quantity: 30, categoryId: 2 },
            { id: 4, name: 'Product 4', price: 400,imageUrl:'Images/4.jpg', description: 'Description for Product 4', quantity: 40, categoryId: 2 },
            { id: 5, name: 'Product 5', price: 500,imageUrl:'Images/5.jpg', description: 'Description for Product 5', quantity: 0, categoryId: 3 },
            { id: 6, name: 'Product 6', price: 600,imageUrl:'Images/6.jpg', description: 'Description for Product 6', quantity: 60, categoryId: 3 }
        ];
  }
  getAllProducts():IProduct[]{
    return this.products;
  }
  getProductById(id: number):IProduct|null{
    let foundedProduct = this.products.find((product)=> product.id ==id);
    return foundedProduct ? foundedProduct : null;
  }
  getProductByCategoryId(catId:number):IProduct[]{
    if(catId==0)
      return this.getAllProducts()
    else
   return this.products.filter((product)=>product.categoryId == catId)
  }
  mapProductsToId(){
   return this.products.map((prod)=>prod.id)
  }
}
