/**
 * Created by ASUS on 2017/5/8.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {BaseUrl} from "../common/commonSet"
import {TimeoutError} from "rxjs/Rx";
import {StorageService} from "./storage.service";
import {ShowMessageService} from "./show-message.service";
import {Observable} from "rxjs/Observable";
import {AlertController} from "ionic-angular";


@Injectable()
export class AuthService {
  userUrl = BaseUrl + 'user/detail';
  qrUrl = BaseUrl + 'user/getregisterqr';
  userInfo :any;

  fansList = {            //我的粉丝
    pageLimit: 20,        //每次获取记录数
    pageIndex: 1,         //当前页数
    pageUrl: BaseUrl + 'user/supbordinates',
    dataInfo:[]
  };

  constructor(private http: HttpClient,
              private showMessageService: ShowMessageService) {

  }

  /**
   * 获取用户信息
   */
  getUserInfo(): Promise<any> {
    let self = this;
    self.showMessageService.showLoading('数据加载中');
    let token = 'Bearer ' + StorageService.read('token');
    return this.http.get<any>(this.userUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token)
    }).toPromise()
      .then(function (response) {
        console.log('result:', response);
        self.showMessageService.hideLoading();
        self.userInfo = response;
        console.log("level@@@@", response.userInfo.level);
        StorageService.write("level", response.userInfo.level);
        return self.userInfo;
      })
      .catch(function (err) {
        self.showMessageService.hideLoading();
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(this.rechargeList.pageUrl, err);//处理请求失败
      })
  }


  /**
   * 获取二维码图片地址
   */
  getQrInfo(): Promise<any> {
    let self = this;
    self.showMessageService.showLoading('数据加载中');
    let token = 'Bearer ' + StorageService.read('token');
    return this.http.get<any>(this.qrUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token)
    }).toPromise()
      .then(function (response) {
        console.log('result:', response);
        self.showMessageService.hideLoading();
        return response;
      })
      .catch(function (err) {
        self.showMessageService.hideLoading();
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(this.rechargeList.pageUrl, err);//处理请求失败
      })
  }

  /**
   * 获取粉丝信息
   */
  getFansList(): Promise<any> {
    let self = this;
    self.fansList.dataInfo=[];
    self.showMessageService.showLoading('数据加载中');
    let token = 'Bearer '+StorageService.read('token');
    return this.http.get<any>(this.fansList.pageUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization',token),
      params: new HttpParams()
        .set('limit', '' + this.fansList.pageLimit)
        .set('offset', '' + this.fansList.pageIndex),
    }).toPromise()
      .then(function (response) {
        console.log('result:', response);
        self.showMessageService.hideLoading();
        if (response.status!=0){
          self.fansList.dataInfo=response.data;
        }
        return self.fansList.dataInfo;
      })
      .catch(function (err) {
        self.showMessageService.hideLoading();
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(this.rechargeList.pageUrl, err);//处理请求失败
      })
  }

  /**
   * 刷新粉丝信息
   * @param action Pull下拉 dropDown上推
   */
  refreshFansList(action:string): Promise<any> {
    let self = this;
    let token = 'Bearer '+StorageService.read('token');
    if (action == "Pull") {
      self.fansList.dataInfo=[];
      this.fansList.pageIndex = 1;
    } else {
      this.fansList.pageIndex += 1;
    }
    return this.http.get<any>(this.fansList.pageUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization',token),
      params: new HttpParams()
        .set('limit', '' + this.fansList.pageLimit)
        .set('offset', '' + this.fansList.pageIndex),
    }).toPromise()
      .then(function (response) {
        if (response.status!=0) {
          for (let i = 0; i < response.data.length; i++) {
            self.fansList.dataInfo.push(response.data[i]);
          }
          console.log('refreshRechargeList:', self.fansList.dataInfo);
        }
        return self.fansList.dataInfo;
      })
      .catch(function (err) {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(this.rechargeList.pageUrl, err);//处理请求失败
      })
  }

  /**
   * 提交后台验证登录
   * @param info 用户信息
   */
  registerUser(info): Promise<any> {
    const registerUrl = BaseUrl + 'user/register';
    let self=this;
    self.showMessageService.showLoading('正在提交注册');
    return this.http.post(registerUrl, null, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      params: new HttpParams()
        .set('account', info.account)
        .set('password', info.password)
        .set('phone', info.phone)
        .set('superior', info.superior),
    })
      .toPromise()
      .then(function (response) {
        console.log('result:',response);
        self.showMessageService.hideLoading();
        return response;
      })
      .catch(function (err) {
        self.showMessageService.hideLoading();
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(registerUrl, err);//处理请求失败
        //return err.error;
      })
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
        if (typeof err.error.message != "undefined") {
          msg = err.error.message;
        } else {
          msg = '请求失败，服务器出错，请稍后再试！';
        }
        break;
    }
    this.showMessageService.alert(msg);
    return
  }
}
