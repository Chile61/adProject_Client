import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointsAccountPage } from './points-account';
import {DataListModule} from "../../components/data-list/data-list.module";
import {PointsService} from "../../providers/points.service";

@NgModule({
  declarations: [
    PointsAccountPage,
  ],
  imports: [
    DataListModule,
    IonicPageModule.forChild(PointsAccountPage),
  ],
  providers:[
    PointsService,
  ]
})
export class PointsAccountPageModule {}
