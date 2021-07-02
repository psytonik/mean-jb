import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoriesService, Category, Product, ProductsService } from "@psytonik-dev/products";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Subscription, timer } from "rxjs";

@Component({
  selector: 'adminshop-products-form',
  templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit,OnDestroy {

  form!: FormGroup;
  submitted = false;
  editMode = false;
  checked = false;
  categories:Category[] =[];
  imageDisplay:any | ArrayBuffer ='';
  categorySub!: Subscription;
  productSub!: Subscription;
  createProductSub!: Subscription;
  updateProductSub!: Subscription;
  routeParamsSub!: Subscription;

  currentProductId = '';

  constructor(
    private productService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this._checkEditMode();
    this._getCategories();
    this._initForm()
  }

  onSubmit(){
    this.submitted = true;
    if (this.form.invalid){
      return
    }
    const productFormData = new FormData();

    Object.keys(this.productForm).map((key)=>{
      productFormData.append(key, this.productForm[key].value)
    })

    if( this.editMode){
      this._updateProduct(productFormData)
    } else {
      this._addProduct(productFormData);
    }
  }

  onCancel(){
    this.location.back();
  }

  onImageUpload(event:any){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image:file});
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = ()=> {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      brand: ['',Validators.required],
      price: ['',Validators.required],
      category: [this.categories,Validators.required],
      countInStock: ['',Validators.required],
      richDescription: [''],
      image: ['',Validators.required],
      isFeatured: [false]
    })
  }

  get productForm(){
    return this.form.controls;
  }

  private _getCategories() {
    this.categorySub = this.categoryService.getCategories()
      .subscribe((category:Category[]) => {
        this.categories = category;
      });
  }

  ngOnDestroy(): void {
    if(this.categorySub){
      return this.categorySub.unsubscribe();
    }else if(this.productSub){
      return this.productSub.unsubscribe();
    } else if (this.createProductSub){
      return this.createProductSub.unsubscribe();
    } else if(this.updateProductSub) {
      return this.updateProductSub.unsubscribe();
    } else if (this.routeParamsSub){
      this.routeParamsSub.unsubscribe();
    }
  }

  private _addProduct(productData: FormData) {
    this.createProductSub = this.productService.createProduct(productData)
      .subscribe((product:Product)=>{
        this.messageService.add(
          {severity:'success', summary:'Success', detail:`Product ${product.name} is Created Successfully`}
        );
        this.form.reset();
        timer(2000).toPromise().then(()=>{
          this.submitted = false;
          this.router.navigate(['products']);
        })
      },(error) => {
        this.messageService.add(
          {severity:'error', summary:'Error', detail:error.message}
        );
        this.submitted = false;
      })
  }

  private _updateProduct(productData: FormData) {
    this.updateProductSub = this.productService.updateProduct(productData,this.currentProductId)
      .subscribe((product:Product)=>{
        this.messageService.add(
          {severity:'success', summary:'Success', detail:`Product ${product.name} is Updated Successfully`}
        );
        this.form.reset();
        timer(2000).toPromise().then(()=>{
          this.submitted = false;
          this.router.navigate(['products']);
        })
      },(error) => {
        this.messageService.add(
          {severity:'error', summary:'Error', detail:error.message}
        );
        this.submitted = false;
      })
  }

  private _checkEditMode(){
    this.routeParamsSub =this.route.params.subscribe((response) => {
      if(response.id){
        this.editMode = true;
        this.currentProductId = response.id;
        this.productSub = this.productService.getProductById(this.currentProductId)
          .subscribe(product=>{
            const {
              image, richDescription, brand, countInStock,
              isFeatured, name, category, price, description
            } = product;
            this.productForm.name.setValue(name);
            this.productForm.description.setValue(description);
            this.productForm.richDescription.setValue(richDescription);
            this.productForm.countInStock.setValue(countInStock);
            this.productForm.brand.setValue(brand);
            this.productForm.price.setValue(price);
            this.productForm.isFeatured.setValue(isFeatured);
            this.productForm.category.setValue(category?.id);
            this.imageDisplay = image;
            this.productForm.image.setValidators([]);
            this.productForm.image.updateValueAndValidity();
          })
      }
    })

  };

}
