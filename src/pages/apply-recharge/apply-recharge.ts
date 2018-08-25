import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ShowMessageService} from "../../providers/show-message.service";
import {AuthService} from "../../providers/auth.service";
import {PointsService} from "../../providers/points.service";

/**
 * Generated class for the ApplyRechargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-recharge',
  templateUrl: 'apply-recharge.html',
})
export class ApplyRechargePage {
  accountInfo = {
    'id': 0,
    'cash': 0
  };

  applyCashNum :number =0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private pointsService: PointsService,
    private showMessageService: ShowMessageService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyRechargePage');
    this.authService.getUserInfo().then((data) => {
      this.accountInfo.id = data.userInfo.id;
      this.accountInfo.cash = data.userInfo.cash;
    });
  }

  applyCash() {
    //this.showMessageService.showToast('手机端暂未支持充值，请联系客服');
    this.authService.getUserInfo().then((data) => {
        this.pointsService.rechargeApplyCash(this.applyCashNum).then((result) => {
          if (result) {
            this.showMessageService.showToast('申请冲值成功！');
            this.navCtrl.pop();
          } else {
            this.showMessageService.showToast('申请冲值失败！');
          }
        })
    });
  }

  showList() {
    this.navCtrl.push('RechargeLogPage')
  }
}
