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

export enum UrlInfo{All,Pic_HomeSlide,Pic_HomeOne,Pic_HomeTwo,Pic_HomeThree,Notice_HomeNotice,Classification_One}
@Injectable()
export class AdService {
  versionUrl = BaseUrl + "appVersion/version";
  urlInfo=[
    {                                 //广告
      adType: '',                     //广告类型
      adPosition: '',                 //广告位置
      pageUrl: BaseUrl + 'ad/list',
      dataInfo:[]
    },
    {                                //广告
      adType: '图片广告',             //广告类型
      adPosition: '首页滚动',         //广告位置
      pageUrl: BaseUrl + 'ad/list',
      dataInfo:[]
    },
    {                                //广告
      adType: '图片广告',             //广告类型
      adPosition: '首页图片一',         //广告位置
      pageUrl: BaseUrl + 'ad/list',
      dataInfo:[]
    },
    {                                //广告
      adType: '图片广告',             //广告类型
      adPosition: '首页图片二',         //广告位置
      pageUrl: BaseUrl + 'ad/list',
      dataInfo:[]
    },
    {                                //广告
      adType: '图片广告',             //广告类型
      adPosition: '首页图片三',         //广告位置
      pageUrl: BaseUrl + 'ad/list',
      dataInfo:[]
    },
    {                                //广告
      adType: '公告',             //广告类型
      adPosition: '首页公告',         //广告位置
      pageUrl: BaseUrl + 'ad/list',
      dataInfo:[]
    },
    {                                //广告
      adType: '图片广告',             //广告类型
      adPosition: '店铺分类顶部',             //广告位置
      pageUrl: BaseUrl + 'ad/list',
      dataInfo:[]
    },
  ];

  constructor(private http: HttpClient,
              private showMessageService: ShowMessageService) {
  }

  /**
   * 获取记录列表
   * @param index 获取哪个记录
   */
  getList(index:UrlInfo): Promise<any> {
    let self = this;
    self.urlInfo[index].dataInfo=[];
    self.showMessageService.showLoading('数据加载中');
    let token = 'Bearer '+StorageService.read('token');
    return this.http.get<any>(this.urlInfo[index].pageUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization',token),
      params: new HttpParams()
        .set('type', '' + self.urlInfo[index].adType)
        .set('position', '' + self.urlInfo[index].adPosition)
    }).toPromise()
      .then(function (response) {
        console.log('result:', response);
        self.showMessageService.hideLoading();
        if (response.status!=0){
          self.urlInfo[index].dataInfo=response.data;
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


  // //检查版本号
  // checkAppVersion():Observable<any> {
  //   let self = this;
  //   let params = new URLSearchParams();
  //   let token = 'Bearer ' + StorageService.read('token');
  //   params.set("method","showVersion");
  //   params.set("client_type",client_type);
  //   params.set("userunit",encodeURI(user_unit));
  //   return this.http.post(BaseUrl+"mobile/PadUserAction.do",{params:params}, false).map(
  //     response=> response.json()
  //   ).catch(function (err) {
  //     self.showMessageService.hideLoading();
  //     if (err.error instanceof Error) {
  //       console.log('An error occurred:', err.error.message);
  //     } else {
  //       console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
  //       console.log(err.error);
  //     }
  //     self.requestFailed(self.urlInfo[index].pageUrl, err);//处理请求失败
  //   })
  // }
  checkAppVersion(notShowLogin?: boolean): Promise<any> {
    let self = this;
    if (!notShowLogin) {
      self.showMessageService.showLoading('数据加载中');
    }
    let token = 'Bearer ' + StorageService.read('token');
    return this.http.post<any>(this.versionUrl,  null,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token)
    }).toPromise()
      .then(function (response) {
        console.log('result', response);
        self.showMessageService.hideLoading();
        return response.data;
      })
      .catch(function (err) {
        self.showMessageService.hideLoading();
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(self.versionUrl, err);//处理请求失败
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
