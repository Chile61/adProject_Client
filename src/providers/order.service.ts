/**
 * Created by ASUS on 2017/5/8.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {BaseUrl} from "../common/commonSet"
import {TimeoutError} from "rxjs/Rx";
import {ShowMessageService} from "./show-message.service";
import {StorageService} from "./storage.service";

export enum UrlInfo {OrderList, OrderProductList}

@Injectable()
export class OrderService {
  urlInfo = [
    {                       //订单列表
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'order/orderList',
      dataInfo: []
    },
    {                       //订单商品列表
      pageLimit: 20,       //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'orderProduct/orderProductList',
      dataInfo: []
    }
  ];

  constructor(private http: HttpClient,
              private showMessageService: ShowMessageService,
              ) {
  }

  /**
   * 获取记录列表
   * @param index 获取哪个记录
   * @param state 订单状态
   * @param orderId
   * @param notShowLogin  不显示loading框
   */
  getList(index: UrlInfo, state?: number,orderId?: number,notShowLogin?: boolean): Promise<any> {
    let self = this;
    self.urlInfo[index].dataInfo = [];
    if (!notShowLogin) {
      self.showMessageService.showLoading('数据加载中');
    }
    let token = 'Bearer ' + StorageService.read('token');
    return this.http.post<any>(this.urlInfo[index].pageUrl,  null,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token),
      params: new HttpParams()
        .set('limit', '' + self.urlInfo[index].pageLimit)
        .set('offset', '' + self.urlInfo[index].pageIndex)
        .set('state', '' + state)
        .set('orderId', '' + orderId)
    }).toPromise()
      .then(function (response) {
        console.log('result(index):', response, index);
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
   * 刷新记录列表
   * @param index 获取哪个记录
   * @param action Pull下拉 dropDown上推
   * @param state
   * @param orderId
   */
  refreshList(index: UrlInfo, action: string,state?: number,orderId?: string): Promise<any> {
    let self = this;
    let token = 'Bearer ' + StorageService.read('token');
    if (action == "Pull") {
      this.urlInfo[index].dataInfo = [];
      this.urlInfo[index].pageIndex = 1;
    } else {
      this.urlInfo[index].pageIndex += 1;
    }
    return this.http.post<any>(this.urlInfo[index].pageUrl, null,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token),
      params: new HttpParams()
        .set('limit', '' + self.urlInfo[index].pageLimit)
        .set('offset', '' + self.urlInfo[index].pageIndex)
        .set('state', '' + state)
        .set('orderId', '' + orderId)
    }).toPromise()
      .then(function (response) {
        for (let i = 0; i < response.length; i++) {
          self.urlInfo[index].dataInfo.push(response[i]);
        }
        console.log('refreshRechargeList:', self.urlInfo[index].dataInfo);
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
