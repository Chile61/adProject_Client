import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ShowMessageService} from "../../providers/show-message.service";
import {WithdrawLogPage} from "../withdraw-log/withdraw-log";
import {PointsService} from "../../providers/points.service";
import {AuthService} from "../../providers/auth.service";

/**
 * Generated class for the ApplyRechargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-withdrawals',
  templateUrl: 'apply-withdrawals.html',
})
export class ApplyWithdrawalsPage {
  accountInfo={
    'id':0,
    'cloudPoints':0,
  };

  applyCloudPointsNum: number =0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService:AuthService,
    private pointsService:PointsService,
    private showMessageService:ShowMessageService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyRechargePage');
    this.authService.getUserInfo().then((data) => {
      this.accountInfo.id = data.userInfo.id;
      this.accountInfo.cloudPoints = data.userInfo.cloudPoints;
    });
  }

  applyCloudPoints(){
    //this.showMessageService.showToast('手机端暂未支持提现，请联系客服');
    this.authService.getUserInfo().then((data) => {
      if (this.applyCloudPointsNum <= data.userInfo.cloudPoints) {
        this.pointsService.withdrawApplyCloud(this.applyCloudPointsNum).then((result) => {
          if (result) {
            this.showMessageService.showToast('申请提现成功！');
            this.navCtrl.pop();
          } else {
            this.showMessageService.showToast('申请提现失败！');
          }
        })
      }else{
        this.showMessageService.showToast('请输入正确提现积分！');
      }
    })
  }

  showList(){
    this.navCtrl.push('WithdrawLogPage');
  }
}
