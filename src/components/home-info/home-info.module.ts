import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HomeInfo } from './home-info';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    HomeInfo,
  ],
  imports: [
    PipesModule,
    IonicModule,
  ],
  exports: [
    HomeInfo
  ]
})
export class HomeInfoModule {}
