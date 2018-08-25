/**
 * Created by ASUS on 2017/5/8.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {BaseUrl} from "../common/commonSet"
import {StorageService} from "./storage.service";
import {TimeoutError} from "rxjs/Rx";
import {ShowMessageService} from "./show-message.service";
import {Observable} from "rxjs/Observable";
import {AlertController} from "ionic-angular";


@Injectable()
export class LoginService {
  token: string;
  applyUrl = BaseUrl + 'user/monitorApply';
  isShowApply: boolean = false;
  constructor(
    private http: HttpClient,
    public alertCtrl: AlertController,
    private showMessageService:ShowMessageService
    ) {

  }

  /**
   * 提交后台验证登录
   * @param userName 用户名
   * @param userPassword 密码
   */
  getLoginList(userName, userPassword): Promise<any> {
    const loginUrl = BaseUrl + 'auth';
    let self=this;
    return this.http.post(loginUrl, null, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
        params: new HttpParams().set('userName', userName).set('password', userPassword),
      })
      .toPromise()
      .then(function (response) {
        console.log('result:',response);
        return response;
      })
      .catch(function (err) {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(loginUrl, err);//处理请求失败
        //return err.error;
      })
  }

  /**
   * 保存用户信息
   * @param userData 用户json对像数据
   * @param userName 需要保存的用户名
   */
  saveUserInfo(userData: any,userName:string) {
    console.log('saveUserInfo:', userData);
    StorageService.write("randomKey", userData.randomKey);
    StorageService.write("token", userData.token);
    StorageService.write("level", userData.level);
    //用户的登录名称
    StorageService.write("userName", userName);
    this.token = userData.token;
  }

  /**
   * 每5分钟监听一次是否有人申请充值或提现
   */
  getMonitorApply(){
    let self = this;
    Observable.interval(10000).subscribe(()=> {
      if (!self.isShowApply) {
        let token = 'Bearer ' + StorageService.read('token');
        this.http.post<any>(this.applyUrl, null, {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token),
          params: new HttpParams()
        }).toPromise()
          .then(function (response) {
            console.log('result:', response);
            let showStr = "";
            if (response.applyCash != 0) {
              showStr = "  有" + response.applyCash + "条充值任务";
            }
            if (response.applyCloud != 0) {
              showStr = "  有" + response.applyCloud + "条提现任务";
            }
            self.isShowApply = true;
            let prompt = self.alertCtrl.create({
              title: '提示',
              message: showStr,
              buttons: [
                {
                  text: '确定',
                  handler: data => {
                    self.isShowApply = false;
                  }
                }
              ]
            });
            prompt.present();
          })
          .catch(function (err) {
            if (err.error instanceof Error) {
              console.log('An error occurred:', err.error.message);
            } else {
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
              console.log(err.error);
            }
          })
      }
    });
  }

  /**
   * 处理请求失败事件
   * @param url
   * @param err
   */
  private requestFailed(url: string, err: HttpErrorResponse): void {
    this.showMessageService.hideLoading();
    if (err instanceof TimeoutError) {
      this.showMessageService.alert('请求超时,请稍后再试!');
      return;
    }

    if (!this.showMessageService.isConnecting()) {
      this.showMessageService.alert('网络未连接,请检查网络设置');
      return;
    }

    let status = err.status;
    let msg = '请求发生异常！';
    switch (status) {
      case 0:
        msg = '请求失败，请求响应出错！';
        break;
      case 404:
        msg = '请求失败，未找到请求地址！';
        break;
      case 400:
        msg = '用户或密码错误！';
        break;
      case 500:
          if (typeof err.error.message != "undefined"){
            msg = err.error.message;
          }else{
            msg = '请求失败，服务器出错，请稍后再试！';
          }
        break;
    }
    this.showMessageService.alert(msg);
    return
  }
}
