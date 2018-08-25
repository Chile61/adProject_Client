import { NgModule } from '@angular/core';
import {FilterADType} from "./filter-ad-type";
import { SliceStrPipe } from './slice-str';

@NgModule({
  declarations: [
    FilterADType,
    SliceStrPipe,
  ],
  exports: [
    FilterADType,
    SliceStrPipe,
  ]
})
export class PipesModule { }
