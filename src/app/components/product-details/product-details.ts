import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StaticProducts } from '../../services/static-products';
import { Products } from '../products/products';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { CommonModule, Location } from '@angular/common';
import { ApiProducts } from '../../services/api-products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './product-details.html',
  styles: ``,
})
export class ProductDetails implements OnInit{
    totalPrice: number = 0;
    product: IProduct|null = {} as IProduct;
    currentId:number =0;
    idsArr: number[]=[]
    allProducts:IProduct[] = [];
   constructor(
    private _productService:ApiProducts,
    //private _service:StaticProducts,
    private activatedRoute:ActivatedRoute,
    private _location: Location,
    private router:Router,
    private cdr: ChangeDetectorRef){
    //this.idsArr= this..mapProductsToId()

   }
  ngOnInit(): void {
//    this.currentId =Number(this.activatedRoute.snapshot.paramMap.get("id"))
// this.product = this._productService.getProductById(this.currentId);

// observer design pattern
// working with static data
// this.activatedRoute.paramMap.subscribe(
//     (paramMap)=>{
//      this.currentId = Number(paramMap.get('id'))
//       this._productService.getProductById(this.currentId).subscribe({
//       next:(value)=> {
//         this.product = value
//       },
//       error:(err)=> {
        
//       },
//      })
//     }
//)
this._productService.getAllProducts().subscribe({
  next:(allProducts)=>{
    this.idsArr = allProducts.map((prod)=>prod.id);
   }
  });
  this.activatedRoute.paramMap.subscribe((paramMap)=>{
     this.currentId = Number(paramMap.get('id'))
      this._productService.getProductById(this.currentId).subscribe({
      next:(value)=> {
        this.product = value
        this.loadProductFromMemory()
        this.cdr.detectChanges();
      },
      error:(err)=> {
        console.error("Product not found",err)
      },
     })
    }
)
}
   addToCart(count:string, item: any){
        const requestedQty = +count;
    if(item.quantity >= requestedQty){
       this.totalPrice += (+count*item.price);
       item.quantity = item.quantity - (+count);
       // fire event
      //  this.onTotalPriceChanges.emit(this.totalPrice);
    }
    else{
        alert("Sorry! there is only "+item.quantity)
    }
    }

    goBack(){
    this._location.back()
    }

    nextProduct(){
     let currentIdIndex =  this.idsArr.findIndex((id)=>id == this.currentId)
     if(currentIdIndex != this.idsArr.length - 1){
     this.router.navigateByUrl(`/productDetails/${this.idsArr[currentIdIndex + 1]}`)
    }
    }
    prevProduct(){
     let currentIdIndex =  this.idsArr.findIndex((id)=>id == this.currentId)
     if(currentIdIndex != 0){
     this.router.navigateByUrl(`/productDetails/${this.idsArr[currentIdIndex - 1]}`)
     }
    }
    loadProductFromMemory() {
    // بدل ما نكلم السيرفر، بندور في الـ Array اللي معانا
    if (this.allProducts.length > 0) {
      this.product = this.allProducts.find(p => p.id == this.currentId) || null;
    }
  }
}
