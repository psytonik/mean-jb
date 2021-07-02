import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'ui-slider',
  templateUrl: './slider.component.html'
})

export class SliderComponent implements OnInit {
  selectedImage = '';

  @Input() images:any;

  ngOnInit(): void {
    if(this.hasImages){
      this.selectedImage = this.images[0];
    }
  }

  changeSelectedImage(imageUrl:string){
    this.selectedImage = imageUrl;
  }
  get hasImages():boolean {
    return this.images?.length > 0;
  }
}
