import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-slider',
  templateUrl: './slider.component.html'
})

export class SliderComponent implements OnInit {
  @Input() images!: any;

  selectedImage!: string;
  constructor() { }

  ngOnInit(): void {
    if(this.hasImages){
      this.selectedImage = this.images[0];
    }
  }

  changeSelectedImage(imageUrl:string){
    this.selectedImage = imageUrl;
  }

  get hasImages(){
    return this.images?.length> 0
  }
}
