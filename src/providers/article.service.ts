/**
 * Created by ASUS on 2017/5/8.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BaseUrl} from "../common/commonSet"
import {TimeoutError} from "rxjs/Rx";
import {ShowMessageService} from "./show-message.service";

export enum UrlInfo{All}
@Injectable()
export class ArticleService {
  urlInfo = BaseUrl + 'article/list';
  dataInfo=[];

  constructor(private http: HttpClient,
              private showMessageService: ShowMessageService) {
  }

  /**
   * 获取记录列表
   */
  getList(): Promise<any> {
    let self = this;
    self.dataInfo=[];
    self.showMessageService.showLoading('数据加载中');
    //let token = 'Bearer '+StorageService.read('token');
    return this.http.get<any>(this.urlInfo).toPromise()
      .then(function (response) {
        console.log('result:', response);
        self.showMessageService.hideLoading();
        if (response.status!=0){
          self.dataInfo=response.data;
        }
        return self.dataInfo;
      })
      .catch(function (err) {
        self.showMessageService.hideLoading();
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(self.urlInfo, err);//处理请求失败
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
