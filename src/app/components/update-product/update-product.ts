import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/icategory';
import { IProduct } from '../../models/iproduct';
import { ApiProducts } from '../../services/api-products';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCategory } from '../../services/api-category';
import { Observable } from 'rxjs';
import { required, validate } from '@angular/forms/signals';

@Component({
  selector: 'app-update-product',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit{
  categories$:Observable<ICategory[]> = new Observable<ICategory[]>(); // Observable to hold categories data
  product:IProduct = {} as IProduct;
  productId:number=0;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  constructor(private _productService:ApiProducts,
    private _categoryService:ApiCategory,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef){
  }
  ngOnInit(): void {
       this.categories$ = this._categoryService.getAllCategories();
      this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this._productService.getProductById(this.productId).subscribe({
        next:(product)=> {
          this.UpdateForm.patchValue({
            id:product.id,
            name:product.name,
            price:product.price,
            quantity:product.quantity,
            description:product.description,
            categoryId:Number(product.categoryId),
            imageUrl:product.imageUrl
          });
          setTimeout(() => {
            this.cdr.detectChanges()
          }, (0));
        },
        error:(err)=> {
          console.error("Product not found",err)
          this.router.navigate(['/products']);
        }
      })
  }

  updateProduct(){
    if(this.UpdateForm.invalid) return;
    this.product = this.UpdateForm.value as IProduct;
  this._productService.updateProduct(this.product,this.productId).subscribe({
    next:(value)=> {
      alert('Product Updated Successfully')
      this.router.navigateByUrl('/products')
    },
    error:(err)=> {
      console.error("Error updating product",err)
    }
  })
  }

UpdateForm = new FormGroup({
    id: new FormControl<number| undefined>(undefined),
    name:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    price:new FormControl<number|null>(null,[Validators.required,Validators.min(10),Validators.max(100000)]),
    quantity:new FormControl<number|null>(null,[Validators.required,Validators.min(0),Validators.max(100)]),
    description:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(100)]),
    categoryId:new FormControl<number|null>(null,[Validators.required]),
    imageUrl: new FormControl("",[Validators.required])
  })
 get NameValid(){
  return this.UpdateForm.get('name')?.valid?? false;
}
get PriceValid(){
  return this.UpdateForm.get('price')?.valid?? false;
}
get QuantityValid(){
  return this.UpdateForm.get('quantity')?.valid?? false;
}
get DescriptionValid(){
  return this.UpdateForm.get('description')?.valid?? false;
}
get ImageUrlValid(){
  return this.UpdateForm.get('imageUrl')?.valid?? false;    
}
}
