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

export enum UrlInfo {
  Recharge, Withdraw, PointsAccountJournal,
  CloudPointsAccountJournal, ShoppingPointsAccountJournal, RechargeWithdrawSumLog,ConversionSumLog
}

@Injectable()
export class PointsService {

  urlRechargeApplyCash = BaseUrl + 'rechargeApplyCash/apply';
  urlWithdrawApplyCloud = BaseUrl + 'withdrawApplyCloud/apply';


  urlInfo = [
    {                       //冲值记录
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'rechargeLog/list',
      dataInfo: [],
      type: 0
    },
    {                       //提现记录
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'withdrawLog/list',
      dataInfo: [],
      type: 0
    },
    {                       //积分账户明细
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'pointsAccountJournal/list',
      dataInfo: [],
      type: 0
    },
    {                       //云积分账户明细
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'cloudPointsAccountJournal/list',
      dataInfo: [],
      type: 0
    },
    {                       //购物积分账户明细
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'shoppingPointsAccountJournal/list',
      dataInfo: [],
      type: 0
    },
    {                       //上一日服务器数据
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'rechargeWithdrawSumLog/getLast',
      dataInfo: [],
      type: 0
    },
    {                       //上一日服务器转换数据
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'conversionSumLog/getLast',
      dataInfo: [],
      type: 0
    }
  ];

  constructor(private http: HttpClient,
              private showMessageService: ShowMessageService) {
  }

  /**
   * 申请冲值现金账户
   * @param cash 冲值金额
   */
  rechargeApplyCash(cash): Promise<any> {
    let self = this;
    self.showMessageService.showLoading('正提交。。');
    let token = 'Bearer ' + StorageService.read('token');
    return this.http.post<any>(this.urlRechargeApplyCash, null,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token),
      params: new HttpParams()
        .set('cash', cash)
    }).toPromise()
      .then(function (response) {
        console.log('result:', response);
        self.showMessageService.hideLoading();
        return response.status != 0;
      })
      .catch(function (err) {
        self.showMessageService.hideLoading();
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(self.urlRechargeApplyCash, err);//处理请求失败
      })
  }

  /**
   * 申请提现云积分账户
   * @param points 提现积分
   */
  withdrawApplyCloud(points): Promise<any> {
    let self = this;
    self.showMessageService.showLoading('正提交。。');
    let token = 'Bearer ' + StorageService.read('token');
    return this.http.post<any>(this.urlWithdrawApplyCloud, null,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token),
      params: new HttpParams()
        .set('points', points)
    }).toPromise()
      .then(function (response) {
        console.log('result:', response);
        self.showMessageService.hideLoading();
        return response.status != 0;
      })
      .catch(function (err) {
        self.showMessageService.hideLoading();
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(self.urlWithdrawApplyCloud, err);//处理请求失败
      })
  }


  /**
   * 刷新记录列表
   * @param index 获取哪个记录
   * @param action Pull下拉 dropDown上推
   */
  refreshList(index: UrlInfo, action: string): Promise<any> {
    let self = this;
    let token = 'Bearer ' + StorageService.read('token');
    if (action == "Pull") {
      this.urlInfo[index].dataInfo = [];
      this.urlInfo[index].pageIndex = 1;
    } else {
      this.urlInfo[index].pageIndex += 1;
    }
    return this.http.get<any>(this.urlInfo[index].pageUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token),
      params: new HttpParams()
        .set('limit', '' + self.urlInfo[index].pageLimit)
        .set('offset', '' + self.urlInfo[index].pageIndex),
    }).toPromise()
      .then(function (response) {
        if (response.status != 0) {
          for (let i = 0; i < response.data.length; i++) {
            self.urlInfo[index].dataInfo.push(response.data[i]);
          }
          console.log('refreshRechargeList:', self.urlInfo[index].dataInfo);
        }
        return self.urlInfo[index].dataInfo;
      })
      .catch(function (err) {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(self.urlInfo[index].pageUrl, err);//处理请求失败
      })
  }

  /**
   * 获取记录列表
   * @param index 获取哪个记录
   */
  getList(index: UrlInfo): Promise<any> {
    let self = this;
    self.urlInfo[index].dataInfo = [];
    self.showMessageService.showLoading('数据加载中');
    let token = 'Bearer ' + StorageService.read('token');
    return this.http.get<any>(this.urlInfo[index].pageUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token),
      params: new HttpParams()
        .set('limit', '' + self.urlInfo[index].pageLimit)
        .set('offset', '' + self.urlInfo[index].pageIndex)
        .set('type', '' + self.urlInfo[index].type),
    }).toPromise()
      .then(function (response) {
        console.log('result:', response);
        self.showMessageService.hideLoading();
        if (response.status != 0) {
          self.urlInfo[index].dataInfo = response.data;
        }
        return self.urlInfo[index].dataInfo;
      })
      .catch(function (err) {
        self.showMessageService.hideLoading();
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(self.urlInfo[index].pageUrl, err);//处理请求失败
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
