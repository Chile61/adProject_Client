import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PointsService, UrlInfo} from "../../providers/points.service";

/**
 * Generated class for the PointsAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-points-account',
  templateUrl: 'points-account.html',
})
export class PointsAccountPage implements OnInit{
  userInfo: any;
  pointsInfo: any =[];
  // pointsInfo = {
  //   'id': 12,
  //   'points': 50000,
  //   'detail': [
  //     {
  //       'id': 111111,
  //       'type': '转入',
  //       'typeShow': '入',
  //       'description': '购买装修获得积分',
  //       'points': 20000,
  //       'dateTime': '2017-11-22 18:36',
  //       'typeColor': "secondary",
  //     },
  //     {
  //       'id': 111112,
  //       'type': '转入',
  //       'typeShow': '入',
  //       'description': '购买装修获得积分',
  //       'points': 20000,
  //       'dateTime': '2017-11-22 18:36',
  //       'typeColor': "secondary",
  //     },
  //     {
  //       'id': '111113',
  //       'type': '转出',
  //       'typeShow': '出',
  //       'description': '每日积分转换',
  //       'points': 3300.50,
  //       'dateTime': '2017-11-22 18:36',
  //       'typeColor': "danger",
  //     },
  //     {
  //       'id': '111114',
  //       'type': '转出',
  //       'typeShow': '出',
  //       'description': '每日积分转换',
  //       'points': 3200.50,
  //       'dateTime': '2017-11-23 18:36',
  //       'typeColor': "danger",
  //     }
  //   ]
  // };

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private pointsService:PointsService,
  ) {
    this.userInfo = navParams.get("userInfo");
  }

  ngOnInit(){
    let self = this;
    this.pointsService.getList(UrlInfo.PointsAccountJournal).then(
      pointsData => {
        console.log('pointsData', pointsData);
        if (typeof pointsData != 'undefined'){
          self.pointsInfo = pointsData;
          self.checkShowColor();
        }
      }
    )
  }

  checkShowColor() {
    for (let i = 0; i < this.pointsInfo.length; i++) {
      if (this.pointsInfo[i].points >0) {
        this.pointsInfo[i].typeShow = '入';
        this.pointsInfo[i].typeColor = 'secondary';
      } else if (this.pointsInfo[i].points <0) {
        this.pointsInfo[i].typeShow = '出';
        this.pointsInfo[i].typeColor = 'danger';
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsAccountPage');
  }

  //下拉刷新
  doRefresh(refresher) {
    this.refreshList("Pull", refresher);
  }

  //上拉刷新
  doInfinite(infiniteScroll) {
    this.refreshList("dropDown", infiniteScroll);
  }

  refreshList(action, closeRefresh) {
    let self = this;
    this.pointsService.refreshList(UrlInfo.PointsAccountJournal,action).then(
      function (pointsData) {
        self.pointsInfo = pointsData;
        self.checkShowColor();
        closeRefresh.complete();
      })
  }
}
