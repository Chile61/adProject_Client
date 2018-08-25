import {Component} from '@angular/core';
import {NavController, IonicPage, Events} from "ionic-angular";
import {LoginService} from "../../providers/login.service";
import {StorageService} from "../../providers/storage.service";
import {Device} from "@ionic-native/device";
import {ShowMessageService} from "../../providers/show-message.service";
import {TabsPage} from "../tabs/tabs";
import {ShopService, UrlInfo} from "../../providers/shop.service";
import {Observable} from "rxjs/Observable";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {RegisterPage} from "../register/register";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {AuthService} from "../../providers/auth.service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  imgBlackground: any = "assets/imgs/login-background.png";
  imgLogo: any = "assets/img/logo.png";
  userName: any;
  userPassword: string;
  deviceId: any;
  token: any;
  testInfo: any;

  public buttonText: string;
  public qrLoading: boolean;

  constructor(private navCtrl: NavController,
              private loginService: LoginService,
              private shopService: ShopService,
              private showMessageService: ShowMessageService,
              private authService: AuthService,
              public events: Events,
              private barcodeScanner: BarcodeScanner,
              private iab: InAppBrowser,
              private device: Device) {
    this.deviceId = this.device.uuid;//设备的uuid
    this.token = StorageService.read("token");
    this.userName = StorageService.read("userName");
  }

  ionViewDidLoad() {
    this.buttonText = "扫码注册";
    this.qrLoading = false;
  }

  ionViewDidEnter() {
    let self = this;
    this.events.subscribe('msg:scanRegister', function (item) {
      Observable.interval(100).take(1).subscribe(function () {
        self.navCtrl.push('RegisterPage', {'qrData': item})
      });
    })
  }

  /**
   * 点击登陆
   */
  login() {
    //Todo 调试再改回来
    if (this.userName == "" || this.userName == null) {
      this.showMessageService.showToast("用户名不能为空");
      return;
    } else if (this.userPassword == null || this.userPassword == "") {
      this.showMessageService.showToast("密码不能为空");
      return;
    }
    this.getLoginInfo(this.userName, this.userPassword);
    //this.navCtrl.setRoot(TabsPage);
  }

  /**
   * 点击登陆
   * @param userName 用户名
   * @param userPassword 密码
   */
  getLoginInfo(userName: string, userPassword: string) {
    let self = this;
    this.loginService.getLoginList(userName, userPassword).then(
      userData => {
        console.log('userData', userData);
        if (typeof userData != 'undefined') {
          self.loginService.saveUserInfo(userData, userName);
          self.shopService.getList(UrlInfo.ShopCartList);
          self.authService.getUserInfo().then((data)=>{
            if (data.userInfo.managerApply || data.userInfo.managerOrder){
              self.loginService.getMonitorApply();
            }
          });
          this.navCtrl.setRoot(TabsPage);
        }
      }
    )
  }

  scanRegister() {
    //this.navCtrl.push('QrScanPage')
    this.buttonText = "准备扫码中..";
    this.qrLoading = true;

    let self =this;
    this.barcodeScanner.scan({"resultDisplayDuration":0}).then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("用户取消了操作!");
        this.qrLoading = false;
        return false;
      }
      this.buttonText = "扫码注册";
      console.log("扫码完成!");
      console.log(barcodeData);
      if (LoginPage.isURL(barcodeData.text)){
        const browser = self.iab.create(barcodeData.text,null,{"location":"no"});
        browser.show();
      }else{
        this.navCtrl.push('RegisterPage', {
          qrData: barcodeData.text
        })
      }

    }, (err) => {
      console.log(err);
    });
  }

  register() {

        this.navCtrl.push('RegisterPage', {
          data: "gsgzh"
        })

  }

  static isURL(str_url): boolean {
    let strRegex = '^((https|http|ftp|rtsp|mms)?://)'
      + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
      + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
      + '|' // 允许IP和DOMAIN（域名）
      + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
      + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
      + '[a-z]{2,6})' // first level domain- .com or .museum
      + '(:[0-9]{1,4})?' // 端口- :80
      + '((/?)|' // a slash isn't required if there is no file name
      + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
    let re = new RegExp(strRegex);
    if (re.test(str_url)) {
      return (true);
    } else {
      return (false);
    }
  }


}
