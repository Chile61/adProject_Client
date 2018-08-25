import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyWithdrawalsPage } from './apply-withdrawals';
import {ShowMessageService} from "../../providers/show-message.service";
import {PointsService} from "../../providers/points.service";
import {AuthService} from "../../providers/auth.service";

@NgModule({
  declarations: [
    ApplyWithdrawalsPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyWithdrawalsPage),
  ],
  providers:[
    ShowMessageService,
    AuthService,
    PointsService,
  ]
})
export class ApplyWithdrawalsPageModule {}
