import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ArticleService} from "../../providers/article.service";

/**
 * Generated class for the DetectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detection',
  templateUrl: 'detection.html',
})
export class DetectionPage implements OnInit{
  detectionList: any = [];
  // detectionList = [
  //   {
  //     'id': 123,
  //     'typeId': 1,
  //     'type': '网友发布',
  //     'title': '开始测试',
  //     'userId': 123,
  //     'user': '星星',
  //     'userAvatar':'assets/imgs/logo.png',
  //     'createTime': '2018-12-30 00:00:01',
  //     'startTime': '2018-12-31 00:00:01',
  //     'endTime': '2019-12-31 00:00:01',
  //     'image': 'assets/ad/2018-1.png',
  //     'content': '开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试开始测试',
  //     'auditorId': 1000,
  //     'auditorTime': '2019-12-31 00:00:01',
  //     'publish': true,
  //     'sort': 100
  //   },
  //   {
  //     'id': 123,
  //     'typeId': 1,
  //     'type': '网友发布',
  //     'title': '开始运营',
  //     'userId': 123,
  //     'user': '星星',
  //     'userAvatar':'assets/imgs/logo.png',
  //     'createTime': '2018-12-30 00:00:01',
  //     'startTime': '2018-12-31 00:00:01',
  //     'endTime': '2019-12-31 00:00:01',
  //     'image': 'assets/ad/2018-1.png',
  //     'content': '开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营开始运营',
  //     'auditorId': 1000,
  //     'auditorTime': '2019-12-31 00:00:01',
  //     'publish': true,
  //     'sort': 100
  //   },
  // ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private articleService:ArticleService,
    ) {
  }

  ngOnInit(){
    let self = this;
    this.articleService.getList()
      .then(function (result) {
        self.detectionList=result;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetectionPage');
  }

  onClickDetection(item){
    console.log('ClickDetection',item);
    this.navCtrl.push('DetectionDetailPage', {
      'detectionItem': item
    });
  }
}
