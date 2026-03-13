import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiCategory } from '../../services/api-category';
import { ICategory } from '../../models/icategory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styles: ``,
})
export class Categories implements OnInit{
  categories:ICategory[]=[]
  constructor(private _categoryService:ApiCategory
    ,private cdr:ChangeDetectorRef){}
 ngOnInit(): void {
  this._categoryService.getAllCategories().subscribe({
    next: (value) => {
      setTimeout(() => {
        this.categories = value;
        this.cdr.detectChanges();
      }, 0);
    }
  });
}
}
