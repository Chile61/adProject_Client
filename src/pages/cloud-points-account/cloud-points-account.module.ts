import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CloudPointsAccountPage } from './cloud-points-account';
import {DataListModule} from "../../components/data-list/data-list.module";
import {PointsService} from "../../providers/points.service";

@NgModule({
  declarations: [
    CloudPointsAccountPage,
  ],
  imports: [
    DataListModule,
    IonicPageModule.forChild(CloudPointsAccountPage),
  ],
  providers: [
    PointsService
  ]
})
export class CloudPointsAccountPageModule {}
