import { Component, OnInit,OnDestroy } from '@angular/core';
import { CategoriesService,Category } from '@psytonik-dev/products';
import { Subscription } from 'rxjs';

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
