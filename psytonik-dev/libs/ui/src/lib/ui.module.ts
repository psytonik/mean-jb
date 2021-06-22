import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { StepperComponent } from './stepper/stepper.component';


@NgModule({
  imports: [CommonModule],
  declarations: [
    BannerComponent,
    SliderComponent,
    StepperComponent
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    StepperComponent
  ]
})
export class UiModule {}
