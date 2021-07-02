import { Component, OnDestroy, OnInit } from "@angular/core";

import { Subscription } from "rxjs";
import { Category } from "../../../models/category";
import { CategoriesService } from "../../../services/categories.service";

@Component({
  selector: 'categories-banner',
  templateUrl: './categories-banner.component.html'
})
export class CategoriesBannerComponent implements OnInit,OnDestroy {

  constructor(private categoryService: CategoriesService) { }

  categories:Category[] = [];
  categorySub!: Subscription;
  ngOnInit(): void {
    this.categorySub = this.categoryService.getCategories()
      .subscribe(data=> this.categories = data)
  }
  ngOnDestroy(): void {
    if(this.categorySub){
      this.categorySub.unsubscribe();
    }
  }

}
