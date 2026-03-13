import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormsModule } from '@angular/forms';
import { ICategory } from '../../models/icategory';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { ApiProducts } from '../../services/api-products';
import { Router } from '@angular/router';
import { ApiCategory } from '../../services/api-category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-add-product',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct implements OnInit{
  categories$:Observable<ICategory[]> = new Observable<ICategory[]>(); // Observable to hold categories data
  newProduct:IProduct={} as IProduct;
  productId:number=0;
  selectedCategoryId: number = 0; // Initialize selectedCategoryId to 0 (or any default value)
  isLoading = true;
     constructor(private _productService:ApiProducts,private cdr :ChangeDetectorRef,private _categoryService:ApiCategory,private router:Router){
  } 
  ngOnInit(): void {
    this.categories$ = this._categoryService.getAllCategories();
  }
  
  
  addNewProduct(){
   const newId = Number(this.newProduct.id); // حول ال ID لرقم
  if (isNaN(newId)) {
    alert('Please enter a valid numeric ID.');
    return;
  }

  this._productService.getAllProducts().subscribe(products => {
    const exists = products.some(p => p.id === newId);

    if (exists) {
      alert('ID already exists! Please use a unique ID.');
      return; // يمنع الإرسال
    }

  this.newProduct.id = newId;
  this.newProduct.categoryId = Number(this.newProduct.categoryId);
    this._productService.addProduct(this.newProduct).subscribe({
    next:(value)=> {
      alert('Product added successfully!')
      this.router.navigateByUrl('/products')
    },
    error:(err)=> {
      alert('Error adding product!')
    }
  })
})
}
  onCategoryChange(event:any) {
  this.newProduct.categoryId = Number(event.target.value);
  }
}
