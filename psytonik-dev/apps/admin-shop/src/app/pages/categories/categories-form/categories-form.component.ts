import { Component, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesService, Category } from "@psytonik-dev/products";
import { MessageService } from "primeng/api";
import { Subscription, timer } from "rxjs";

@Component({
  selector: 'adminshop-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit,OnDestroy {

  form!: FormGroup;
  submitted = false;
  editMode = false;
  currentCategoryId = '';
  color!: string;
  createCatSub!:Subscription;
  updateCatSub!:Subscription;
  routeParamsSub!:Subscription;
  getCategorySub!:Subscription;

  constructor(
    private categoryService: CategoriesService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit(): void {
    this._checkEditMode()
    this.form = new FormGroup({
      name: new FormControl(null,Validators.required),
      icon: new FormControl(null,Validators.required),
      color: new FormControl(null),
    })

  }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    const category:Category = {
      name:this.form.value.name,
      color:this.form.value.color,
      icon:this.form.value.icon,
      id: this.currentCategoryId
    };

    if(this.editMode){
      this._updateCategory(category);
    } else {
      this._addCategory(category)
    }

  }

  onCancel() {
    this.location.back();
  }

  private _addCategory(category: Category) {
    this.createCatSub =this.categoryService.createCategory(category)
      .subscribe((category)=>{
        this.messageService.add(
          {severity:'success', summary:'Success', detail:`Category ${category} is Created Successfully`}
        );
        this.form.reset();
        timer(2000).toPromise().then(()=>{
          this.submitted = false;
          this.router.navigate(['categories']);
        })
      },(error) => {
        this.messageService.add(
          {severity:'error', summary:'Error', detail:error.message}
        );
        this.submitted = false;
      }
      )
    }

  private _updateCategory(category: Category) {

    this.updateCatSub =this.categoryService.updateCategory(category,this.currentCategoryId).subscribe(()=>{

        this.messageService.add(
          {severity:'success', summary:'Success', detail:'Successfully Edited'}
        );
        timer(2000).toPromise().then(()=>{
          this.submitted = false;
          this.form.reset();
          this.router.navigate(['categories']);
        })
      },(error) => {
        this.messageService.add(
          {severity:'error', summary:'Error', detail:error.message}
        );
        this.submitted = false;
      })
    }

  private _checkEditMode(){
    this.routeParamsSub =this.route.params.subscribe((response)=>{
      if(response.id) {
        this.editMode = true;
        this.currentCategoryId = response.id;
        this.getCategorySub = this.categoryService.getCategoryById(response.id).subscribe((data)=>{
          this.categoryForm.name.setValue(data.name);
          this.categoryForm.icon.setValue(data.icon);
          this.categoryForm.color.setValue(data.color);
        })
      }
    })
  }

  get categoryForm(){
    return this.form.controls;
  }

  ngOnDestroy(): void {
    if(this.createCatSub){
      this.createCatSub.unsubscribe();
    } else if(this.updateCatSub){
      this.updateCatSub.unsubscribe();
    } else if (this.routeParamsSub){
      this.routeParamsSub.unsubscribe();
    } else if (this.getCategorySub){
      this.getCategorySub.unsubscribe();
    }
  }

}
