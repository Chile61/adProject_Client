import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PointsService, UrlInfo} from "../../providers/points.service";
/**
 * Generated class for the PointsAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cloud-points-account',
  templateUrl: 'cloud-points-account.html',
})
export class CloudPointsAccountPage {
  userInfo: any;
  cloudPointsInfo: any =[];
  // cloudPointsInfo={
  //   'id':12,
  //   'points':50000,
  //   'detail':[
  //     {
  //       'id': 111111,
  //       'type': '转入',
  //       'typeShow': '入',
  //       'description': '每日积分转换',
  //       'points': 20000,
  //       'dateTime': '2017-11-22 18:36',
  //       'typeColor': "secondary",
  //     },
  //     {
  //       'id': 111112,
  //       'type': '转入',
  //       'typeShow': '入',
  //       'description': '每日积分转换',
  //       'points': 20000,
  //       'dateTime': '2017-11-22 18:36',
  //       'typeColor': "secondary",
  //     },
  //     {
  //       'id': '111113',
  //       'type': '转出',
  //       'typeShow': '出',
  //       'description': '购买商品【红酒】',
  //       'points': 3300.50,
  //       'dateTime': '2017-11-22 18:36',
  //       'typeColor': "danger",
  //     },
  //     {
  //       'id': '111114',
  //       'type': '转出',
  //       'typeShow': '出',
  //       'description': '购买商品【红酒】',
  //       'points': 3200.50,
  //       'dateTime': '2017-11-23 18:36',
  //       'typeColor': "danger",
  //     }
  //   ]
  // };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pointsService:PointsService,
  ) {
    this.userInfo = navParams.get("userInfo");
  }

  ngOnInit(){
    let self = this;
    this.pointsService.getList(UrlInfo.CloudPointsAccountJournal).then(
      pointsData => {
        console.log('pointsData', pointsData);
        if (typeof pointsData != 'undefined'){
          self.cloudPointsInfo = pointsData;
          self.checkShowColor();
        }
      }
    )
  }

  checkShowColor(){
    for (let i=0;i<this.cloudPointsInfo.length;i++){
      if (this.cloudPointsInfo[i].points >0){
        this.cloudPointsInfo[i].typeShow='入';
        this.cloudPointsInfo[i].typeColor='secondary';
      } else if (this.cloudPointsInfo[i].points <0){
        this.cloudPointsInfo[i].typeShow='出';
        this.cloudPointsInfo[i].typeColor='danger';
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
    this.pointsService.refreshList(UrlInfo.CloudPointsAccountJournal,action).then(
      function (pointsData) {
        self.cloudPointsInfo = pointsData;
        self.checkShowColor();
        closeRefresh.complete();
      })
  }
}
