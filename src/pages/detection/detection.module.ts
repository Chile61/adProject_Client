import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetectionPage } from './detection';
import {PipesModule} from "../../pipes/pipes.module";
import {ArticleService} from "../../providers/article.service";

@NgModule({
  declarations: [
    DetectionPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(DetectionPage),
  ],
  providers:[
    ArticleService,
  ]
})
export class DetectionPageModule {}
