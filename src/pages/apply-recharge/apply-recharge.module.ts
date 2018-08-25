import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyRechargePage } from './apply-recharge';
import {ShowMessageService} from "../../providers/show-message.service";
import {AuthService} from "../../providers/auth.service";
import {PointsService} from "../../providers/points.service";

@NgModule({
  declarations: [
    ApplyRechargePage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyRechargePage),
  ],
  providers:[
    ShowMessageService,
    AuthService,
    PointsService,
  ]
})
export class ApplyRechargePageModule {}
