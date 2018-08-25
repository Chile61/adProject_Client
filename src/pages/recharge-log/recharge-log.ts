import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PointsService,UrlInfo} from "../../providers/points.service";

/**
 * Generated class for the PointsAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recharge-log',
  templateUrl: 'recharge-log.html',
})
export class RechargeLogPage implements OnInit{
  rechargeListInfo : any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pointsService:PointsService,
  ) {
  }

  ngOnInit(){
    let self = this;
    this.pointsService.getList(UrlInfo.Recharge).then(
      pointsData => {
        console.log('pointsData', pointsData);
        self.rechargeListInfo = pointsData;
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargeLogPage');
  }

  //下拉刷新
  doRefresh(refresher) {
    this.refreshRechargeList("Pull", refresher);
  }

  //上拉刷新
  doInfinite(infiniteScroll) {
    this.refreshRechargeList("dropDown", infiniteScroll);
  }

  refreshRechargeList(action, closeRefresh) {
    let self = this;
    this.pointsService.refreshList(UrlInfo.Recharge,action).then(
      function (pointsData) {
        self.rechargeListInfo = pointsData;
        closeRefresh.complete();
      })
  }
}
