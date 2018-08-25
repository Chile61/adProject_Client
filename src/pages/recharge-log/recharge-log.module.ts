import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechargeLogPage } from './recharge-log';
import {LogListModule} from "../../components/log-list/log-list.module";
import {PointsService} from "../../providers/points.service";

@NgModule({
  declarations: [
    RechargeLogPage,
  ],
  imports: [
    LogListModule,
    IonicPageModule.forChild(RechargeLogPage),
  ],
  providers:[
    PointsService
  ]
})
export class CloudPointsAccountPageModule {}
