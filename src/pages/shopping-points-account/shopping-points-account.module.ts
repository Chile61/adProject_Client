import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingPointsAccountPage } from './shopping-points-account';
import {DataListModule} from "../../components/data-list/data-list.module";
import {PointsService} from "../../providers/points.service";

@NgModule({
  declarations: [
    ShoppingPointsAccountPage,
  ],
  imports: [
    DataListModule,
    IonicPageModule.forChild(ShoppingPointsAccountPage),
  ],
  providers: [
    PointsService
  ]
})
export class ShoppingPointsAccountPageModule {}
