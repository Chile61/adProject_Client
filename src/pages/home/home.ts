import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, Platform} from 'ionic-angular';
import {AdService,UrlInfo} from "../../providers/ad.service";
import {ApplicationUpdateService} from "../../providers/application-update.service";
import {AppVersion} from "@ionic-native/app-version";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  adList:any =[];

  constructor(public navCtrl: NavController,
              private applicationUpdateService:ApplicationUpdateService,
              private alertCtrl: AlertController,
              private platform: Platform,
              private appVersion: AppVersion,
              private adService: AdService) {
  }

  ngOnInit(){
    let self = this;
    this.adService.getList(UrlInfo.All).then(
      listData => {
        console.log('listData', listData);
        if (typeof listData != 'undefined'){
          self.adList=listData;
        }
      }
    )
  }
  ionViewWillEnter() {
    let self = this;
    if(!self.applicationUpdateService.isUpdateApplication){
      self.isUpdateApp();
    }
  }

  isUpdateApp(){
    this.appVersion.getVersionNumber().then(
      ver => {
        this.checkAppVersion(ver);
      }
    ).catch(
      error => console.log("第二个error", error)
    )
  }

  checkAppVersion(appVersion){
    this.adService.checkAppVersion().then(
      result => {
        let new_appVersion = result.version == null ? "" : result.version;
        let new_appUrl = result.url == null ? "" : result.url;
        if(new_appVersion!=""&&appVersion!=new_appVersion){
            this.goToWork(2,new_appUrl);
        }
      })
  }
  updateAppVersion(appUrl){
    let fileName = appUrl.substring(appUrl.lastIndexOf("/") + 1,appUrl.length);
    this.applicationUpdateService.downloadApplication(fileName,appUrl,"App下载进度：");
  }

  goToWork(id,appUrl) {
    switch (id) {
      case 1:
        this.alertCtrl.create({
          title: "信息",
          message: "确定退出当前应用吗?",
          buttons: [
            {
              text: "取消",
              handler: () => {
              }
            },
            {
              text: "确定",
              handler: () => {
                this.platform.exitApp();
                //this.navCtrl.push('LoginPage');
              }
            }
          ]
        }).present();
        break;
      case 2:
        this.alertCtrl.create({
          title: "app更新信息",
          message: "发现新版本App,是否立即升级?",
          buttons: [
            {
              text: "取消",
              handler: () => {
                this.applicationUpdateService.isUpdateApplication = true;
              }
            },
            {
              text: "确定",
              handler: () => {
                this.updateAppVersion(appUrl);
              }
            }
          ]
        }).present();
        break;
    }
  }
}
