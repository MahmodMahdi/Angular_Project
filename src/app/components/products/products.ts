import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ICategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighlightCard } from '../../directives/highlight-card';
import { SquarePipe } from '../../pipes/square-pipe';
import { StaticProducts } from '../../services/static-products';
import { ApiProducts } from '../../services/api-products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule
    ,FormsModule
    // ,HighlightCard
    // ,RouterLink
    // ,SquarePipe
],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit,OnChanges{
     products:IProduct[]=[] as IProduct[]; // Initialize products as an empty array
     filteredProducts: IProduct[];
     totalPrice: number = 0; // Initialize totalPrice to 0
     isLoading = true;// Flag to track if data is loading
     
     // myDate:Date = new Date;
   @Input() selectedCategoryId:number=0

   //define event
  @Output() onTotalPriceChanges = new EventEmitter();

    // num: number=5
        constructor(private _ProductService:ApiProducts
          ,private router:Router,
        private cdr: ChangeDetectorRef){
         this.filteredProducts=this.products;
    }
      ngOnInit(): void {
      //   this._ProductService.getAllProducts().subscribe({
      //     next:(value)=> {
      //       this.products = value;
      //       this.filteredProducts = value;
      //       this.filteredProducts = this.products
      //   },
      // error(err) {
      // }
      // }) 
      this.loadAllProducts();
   }
      ngOnChanges(changes: SimpleChanges):void {
        if(changes['selectedCategoryId']){
          this.selectedCategoryId = Number(changes['selectedCategoryId'].currentValue);
          if(this.selectedCategoryId === 0){
            this.loadAllProducts();
          }
          else{
            this.loadProductsByCategory(this.selectedCategoryId);
        }
      }
}
private loadAllProducts(): void {
  this.isLoading = true;
  this._ProductService.getAllProducts().subscribe({
    next: (value) => {
      this.products = value;
      this.filteredProducts = value;
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error loading all products:', err);
      this.isLoading = false;
    }
  });
}
  private loadProductsByCategory(categoryId: number): void {
  this.isLoading = true;
  this._ProductService.getProductsByCategoryId(categoryId).subscribe({
    next: (value) => {
      this.products = value;
      this.filteredProducts = value;
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error loading products by category:', err);
      this.isLoading = false;
    }
  });
}

    addToCart(count:string, item: any){
        const requestedQty = +count;
        if(item.quantity >= requestedQty){
       this.totalPrice += (+count*item.price);
       item.quantity = item.quantity - (+count);
       // fire event
       this.onTotalPriceChanges.emit(this.totalPrice);
    }
        else{
            alert("Sorry! there is only "+item.quantity)
        }
    }
    // filterProductsByCategory(){
    //     if(this.dataFromParent == 0){
    //         this.filteredProducts = this.products;
    //     }
    //     else{
    //        this.filteredProducts = this.products.filter((product)=>product.categoryId==this.dataFromParent)
    //     }
    // }

    // route in ts not routerLink in html
    navigateToDetails(id:number){
     // this.router.navigate(['/productDetails',id])
      this.router.navigateByUrl(`/productDetails/${id}`)
    }

    addProduct(){
      this.router.navigateByUrl(`/addProduct`)
    }

    deleteProduct(id:number){
    const isConfirmed = confirm('Are you sure you want to delete this product?');
    if(isConfirmed){
    this._ProductService.deleteProduct(id).subscribe({
      next: ()=>{
        this.products = this.products.filter((prod)=>prod.id != id);
        this.filteredProducts = this.filteredProducts.filter((prod)=>prod.id != id);
        alert('Product Deleted Successfully');
        this.cdr.detectChanges()
      },
      error:(err)=>{
        console.error("Error deleting product",err);
        alert("Something went wrong, could not delete the product.")
      }
    })
    }
  }
}