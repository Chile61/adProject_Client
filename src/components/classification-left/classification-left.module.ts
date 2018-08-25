import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ClassificationLeft} from './classification-left'
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ClassificationLeft,
  ],
  imports: [
    PipesModule,
    IonicModule,
  ],
  exports: [
    ClassificationLeft
  ]
})

export class ClassificationLeftModule {}
