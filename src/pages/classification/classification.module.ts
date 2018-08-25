import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassificationPage } from './classification';
import {ClassificationLeftModule} from "../../components/classification-left/classification-left.module";
import {ClassificationShopModule} from "../../components/classification-shop/classification-shop.module";
import {ShopService} from "../../providers/shop.service";
import {AdService} from "../../providers/ad.service";

@NgModule({
  declarations: [
    ClassificationPage,
  ],
  imports: [
    ClassificationLeftModule,
    ClassificationShopModule,
    IonicPageModule.forChild(ClassificationPage),
  ],
  providers: [
    ShopService,
    AdService,
  ]
})
export class ClassificationPageModule {}
