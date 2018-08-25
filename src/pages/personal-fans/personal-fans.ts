import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../providers/auth.service";

/**
 * Generated class for the PersonalFansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-fans',
  templateUrl: 'personal-fans.html',
})
export class PersonalFansPage implements OnInit{
  fansList:any = [];
  isShow:boolean= false;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private authService:AuthService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalFansPage');
  }

  ngOnInit(): void {
    let self = this;
    this.authService.getFansList().then(
      pointsData => {
        console.log('pointsData', pointsData);
        self.fansList = pointsData;
        if (self.fansList.length != 0) {
          self.fansList = pointsData;
          switch (self.fansList.level) {
            case 0:
              self.fansList.levelShow = '消费商';
              break;
            case 1:
              self.fansList.levelShow = '创客';
              break;
            case 2:
              self.fansList.levelShow = '企业';
              break;
            case 3:
              self.fansList.levelShow = '员工';
              break;
          }
        }
        self.isShow = true;
      }
    );
  }
  //下拉刷新
  doRefresh(refresher) {
    this.refreshFansList("Pull", refresher);
  }
  //上拉刷新
  doInfinite(infiniteScroll) {
    this.refreshFansList("dropDown", infiniteScroll);
  }

  refreshFansList(action, closeRefresh) {
    let self = this;
    this.authService.refreshFansList(action).then(
      function (fansData) {
        self.fansList = fansData;
        closeRefresh.complete();
      })
  }
}
