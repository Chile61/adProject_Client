import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPage } from './shop';
import {ShopService} from "../../providers/shop.service";

@NgModule({
  declarations: [
    ShopPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopPage),
  ],
  providers:[
    ShopService
  ]
})
export class ShopPageModule {}
