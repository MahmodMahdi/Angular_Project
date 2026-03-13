import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { Products } from '../products/products';
import { CommonModule } from '@angular/common';
import { ApiCategory } from '../../services/api-category';

@Component({
  selector: 'app-order',
  imports: [CommonModule,FormsModule,Products],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit{
   categories:ICategory[]=[] as ICategory[];
   selectedCategoryId: number = 0; // Initialize selectedCategoryId to 0 (or any default value)
   recievedTotalPrice:number=0;
  constructor(private _categoryService:ApiCategory,private cdr:ChangeDetectorRef) {
  }
  ngOnInit(): void {
 this._categoryService.getAllCategories().subscribe({
      next:(value)=>{
        this.categories=value
        //this.categories.map((cat)=>cat.Id)
        setTimeout(() => {
          this.cdr.detectChanges(); // Manually trigger change detection after data is loaded
        }, 0);
      }
    })  }
   
calcTotalPrice(total:number){
this.recievedTotalPrice = total
  }
  onCategoryChange() {
  // force change detection
  this.selectedCategoryId = Number(this.selectedCategoryId);
  this.cdr.detectChanges();
}
}
