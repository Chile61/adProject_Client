import {Component, OnInit} from '@angular/core';
import {NavController, Platform, AlertController, IonicPage, Events} from "ionic-angular";
import {AppVersion} from "@ionic-native/app-version";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {FileOpener} from "@ionic-native/file-opener";
import {File} from '@ionic-native/file';
import {PointsAccountPage} from "../points-account/points-account";
import {ShoppingPointsAccountPage} from "../shopping-points-account/shopping-points-account";
import {PersonalFansPage} from "../personal-fans/personal-fans";
import {ApplyWithdrawalsPage} from "../apply-withdrawals/apply-withdrawals";
import {CertificationPage} from "../certification/certification";
import {AuthService} from "../../providers/auth.service";
import {PersonalQrCodePage} from "../personal-qr-code/personal-qr-code";
import {PointsService, UrlInfo} from "../../providers/points.service";
import {AdService} from "../../providers/ad.service";

@IonicPage()
@Component({
  selector: 'page-personal-center',
  templateUrl: 'personal-center.html'
})
export class PersonalCenter implements OnInit {

  myAppVersion: string;
  new_appVersion: string;
  new_appUrl: string;

  downAppNum: number = 0;
  downAppText: string = '';
  appBackdropFlag: boolean = false;
  brightness: number = 50;

  userInfo: any;

  rechargeWithdrawSumLogInfo: any;
  conversionSumLogInfo: any;
  // userInfo={
  //   'avatar':'assets/ad/zy-logo.png',
  //   'account':'zz1233',
  //   'name':'张三',
  //   'birthday':'12月10日',
  //   'sex':'男',
  //   'email':'123@123.com',
  //   'phone':'13800138000',
  //   'status':'启用',
  //   'level':'消费商',
  //   'weiXin':'',
  //   'gold':2155.00,
  //   'points':200000,
  //   'stockPoints':324450,
  //   'onlyPayPoints':30000,
  //   'QRcode':'4564646465asdasd'
  // };

  isShow: boolean = false;

  constructor(private navCtrl: NavController, public platform: Platform,
              private transfer: FileTransfer, private file: File,
              private fileOpener: FileOpener, private appVersion: AppVersion,
              public alertCtrl: AlertController, private events: Events,
              private authService: AuthService,
              private adService:AdService,
              private pointsService: PointsService,) {

  }

  ionViewWillEnter() {
    let self = this;
    Promise.all([
      this.authService.getUserInfo(),
      this.pointsService.getList(UrlInfo.RechargeWithdrawSumLog),
      this.pointsService.getList(UrlInfo.ConversionSumLog)
    ]).then(function (result) {
      console.log('listData', result);
      if (typeof result[0] != 'undefined') {
        self.userInfo = result[0].userInfo;
        //6员工7商家8认证会员9注册会员
        switch (self.userInfo.level) {
          case 9:
            self.userInfo.levelShow = '注册会员';
            break;
          case 8:
            self.userInfo.levelShow = '认证会员';
            break;
          case 7:
            self.userInfo.levelShow = '商家';
            break;
          case 6:
            self.userInfo.levelShow = '员工';
        }
      }
      if (typeof result[1] != 'undefined') {
        self.rechargeWithdrawSumLogInfo = result[1];
        console.log('self.rechargeWithdrawSumLogInfo:', self.rechargeWithdrawSumLogInfo);
      }
      if (typeof result[2] != 'undefined') {
        self.conversionSumLogInfo = result[2];
        console.log('self.conversionSumLogInfo:', self.conversionSumLogInfo);
      }
      self.isShow = true;
    });
  }

  ngOnInit(): void {


    // this.authService.getUserInfo().then(
    //   pointsData => {
    //     console.log('pointsData', pointsData);
    //     if (typeof pointsData != 'undefined') {
    //       self.userInfo = pointsData.userInfo;
    //       switch (self.userInfo.level) {
    //         case 0:
    //           self.userInfo.levelShow = '消费商';
    //           break;
    //         case 1:
    //           self.userInfo.levelShow = '创客';
    //           break;
    //         case 2:
    //           self.userInfo.levelShow = '企业';
    //           break;
    //         case 3:
    //           self.userInfo.levelShow = '员工';
    //           break;
    //       }
    //     }
    //     self.isShow = true;
    //   }
    // );
    //
    // this.pointsService.getList(UrlInfo.RechargeWithdrawSumLog)
    //   .then(function (result) {
    //     self.rechargeWithdrawSumLogInfo = result;
    //     console.log('self.rechargeWithdrawSumLogInfo:', self.rechargeWithdrawSumLogInfo);
    //   });
    // this.pointsService.getList(UrlInfo.ConversionSumLog)
    //   .then(function (result) {
    //     self.conversionSumLogInfo = result;
    //     console.log('self.conversionSumLogInfo:', self.conversionSumLogInfo);
    //   });

    if (this.isMobile()) {
      //获取应用的版本号
      this.appVersion.getVersionNumber().then(
        ver => {
          this.myAppVersion = ver;
          console.log(ver);
        }, error => console.log("第一个error", error)
      ).catch(
        error => console.log("第二个error", error)
      )
    }
    //查看是否有可更新的版本
    this.checkAppVersion();
    this.getAccountInfo();
  }

  checkAppVersion() {
    // this.adService.checkAppVersion().then(
    //   result => {
    //     let new_appVersion = result.version == null ? "" : result.version;
    //     let new_appUrl = result.url == null ? "" : result.url;
    //     if(new_appVersion!=""&&appVersion!=new_appVersion){
    //       this.goToWork(2,new_appUrl);
    //     }
    //   })
  }

  goOther(flag) {
    console.log('goOther', flag);
    if (flag == "pointsAccount") {
      this.navCtrl.push('PointsAccountPage', {'userInfo': this.userInfo})
    } else if (flag == "cloudPointsAccount") {
      this.navCtrl.push('CloudPointsAccountPage', {'userInfo': this.userInfo})
    } else if (flag == "shoppingPointsAccount") {
      this.navCtrl.push('ShoppingPointsAccountPage', {'userInfo': this.userInfo})
    } else if (flag == "personalFans") {
      this.navCtrl.push('PersonalFansPage', {'userInfo': this.userInfo})
    } else if (flag == "shoppingPointsAccount") {
      this.navCtrl.push('ShoppingPointsAccountPage', {'userInfo': this.userInfo})
    } else if (flag == "applyRecharge") {
      this.navCtrl.push('ApplyRechargePage', {'userInfo': this.userInfo})
    } else if (flag == "applyWithdrawals") {
      this.navCtrl.push('ApplyWithdrawalsPage', {'userInfo': this.userInfo})
    } else if (flag == "myOrder") {
      this.navCtrl.push('MyOrderPage', {'userInfo': this.userInfo})
    } else if (flag == "certification") {
      this.navCtrl.push('CertificationPage', {'userInfo': this.userInfo})
    } else if (flag == "QRCode") {
      this.navCtrl.push('PersonalQrCodePage')
    } else {

    }
  }

  //退出
  loginOut() {
    //this.platform.exitApp();
  }

  //版本更新
  updateVersion() {
    if (!this.isAndroid()){
      return;
    }
    if (this.new_appVersion != "" && this.new_appVersion != this.myAppVersion) {
      this.alertCtrl.create({
        title: '升级',
        subTitle: '发现新版本App,是否立即升级？',
        buttons: [{text: '取消'},
          {
            text: '确定',
            handler: () => {
              let newApp = this.new_appUrl.substring(this.new_appUrl.lastIndexOf("/") + 1, this.new_appUrl.length);
              this.downloadApp(newApp, this.new_appUrl, "App下载进度：");
            }
          }
        ]
      }).present();
    } else {
      this.alertCtrl.create({
        title: '升级',
        subTitle: '已是最新版本！',
        buttons: [
          {
            text: '确定',
            handler: () => {
            }
          }
        ]
      }).present();
    }
  }

  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 下载安装app
   */
  downloadApp(fileName, fileUrl, alertText) {
    let self = this;
    if (this.isAndroid()) {
      if (!self.appBackdropFlag) {
        let alert = this.alertCtrl.create({
          title: 'App下载进度：0%',
          enableBackdropDismiss: false
        });
        alert.present();
        const fileTransfer: FileTransferObject = this.transfer.create();
        const apk = this.file.externalApplicationStorageDirectory + fileName; //apk保存的目录

        console.log("下载apk文件名:" + apk);

        fileTransfer.download(fileUrl, apk).then(() => {
          self.downAppNum = 100;
          self.fileOpener.open(apk, 'application/vnd.android.package-archive')
            .then(() => console.log('apk is opened'))
            .catch(e => console.log('Error openening apk', e));
        });

        fileTransfer.onProgress((event: ProgressEvent) => {
          self.downAppNum = Math.floor(event.loaded / event.total * 100);
          if (self.downAppNum === 100) {
            self.appBackdropFlag = false;
            alert.dismiss();
          } else {
            let title = document.getElementsByClassName('alert-title')[0];
            self.downAppText = alertText + self.downAppNum + '%';
            title && (title.innerHTML = self.downAppText);
          }
        });
      } else {
        if (self.downAppNum === 100) {
          self.appBackdropFlag = false;
        } else {
          let alert = this.alertCtrl.create({
            title: self.downAppText,
            enableBackdropDismiss: false,
            buttons: [
              {
                text: "后台下载",
                handler: () => {
                  //self.navCtrl.pop();
                  self.appBackdropFlag = true;
                }
              }
            ]
          });
          alert.present();
        }
      }
    }
  }


  //获取账户信息
  getAccountInfo() {

  }

}
