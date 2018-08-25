import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductSearchPage } from './product-search';
import {ShopService} from "../../providers/shop.service";

@NgModule({
  declarations: [
    ProductSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductSearchPage),
  ],
  providers:[
    ShopService
  ]
})
export class ProductSearchPageModule {}
