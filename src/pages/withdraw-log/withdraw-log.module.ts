import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawLogPage } from './withdraw-log';
import {LogListModule} from "../../components/log-list/log-list.module";
import {PointsService} from "../../providers/points.service";

@NgModule({
  declarations: [
    WithdrawLogPage,
  ],
  imports: [
    LogListModule,
    IonicPageModule.forChild(WithdrawLogPage),
  ],
  providers:[
    PointsService
  ]
})
export class CloudPointsAccountPageModule {}
