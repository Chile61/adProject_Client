import {Injectable} from "@angular/core";
import {ToastController, LoadingController, Platform} from "ionic-angular";

import {Network} from "@ionic-native/network";

@Injectable()
export class ShowMessageService {
  private loading: any;
  //设置http请求是否显示loading,注意:设置为true,接下来的请求会不显示loading,请求执行完成会自动设置为false
  private _showLoading: boolean = false;

  constructor(private platform: Platform,
              private toastCtrl: ToastController,
              private network: Network,
              private loadingCtrl: LoadingController,
              ) {
  }

  get isLoading(): boolean {
    return this._showLoading;
  }

  set isLoading(value: boolean) {
    this._showLoading = value;
  }

  /**
   * 统一调用此方法显示Alert对话框提示信息
   * @param title 信息内容
   */
  alert(title: string): void {
    this.toastCtrl.create({
      message: title,
      duration: 1000,
      position: "bottom"
    }).present();
  }

  /**
   * 判断是否有网络
   */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }

  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast(message: string = '操作完成', duration: number = 2000): void {
    let self = this;
    if (!this.isMobile()) {
      console.log("Is not mobile!")
    } else {
      console.log("Is mobile!");
      self.toastCtrl.create({
        message: message,
        duration: duration,
        cssClass: "toastClass",
        position: "bottom"
      }).present();
    }
  };

  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading(content: string = ''): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.loading = this.loadingCtrl.create({
        content: content
      });
      console.log('showLoading Now!');
      this.loading.present();
    }
  };

  /**
   * 关闭loading
   */
  hideLoading(): void {
    let self = this;
    if (this.isLoading) {
      self.loading.dismiss();
      this.isLoading = false;
    }
  };

}
