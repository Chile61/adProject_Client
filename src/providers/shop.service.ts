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
import {GlobalService} from "./global.service";

export enum UrlInfo {ShopType, ShopList, ProductCategory, Product, ShopCartList}

@Injectable()
export class ShopService {
  urlInfo = [
    {                       //店铺类别
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'shopType/list',
      dataInfo: []
    },
    {                       //获取店铺列表
      pageLimit: 100,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'shop/list',
      dataInfo: []
    },
    {                       //商品分类
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'productCategory/list',
      dataInfo: []
    },
    {                       //商品列表
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'product/list',
      dataInfo: [],
    },
    {                       //购物车列表
      pageLimit: 20,        //每次获取记录数
      pageIndex: 1,         //当前页数
      pageUrl: BaseUrl + 'shopCart/list',
      dataInfo: [],
    }
  ];

  urlProductSearch = BaseUrl + 'product/search'; //商品搜索
  urlShopCartAdd = BaseUrl + 'shopCart/add'; //添加到购物车
  urlShopCartDelete = BaseUrl + 'shopCart/delete'; //删除购物车商品
  urlShopCartCreateOrder = BaseUrl + 'shopCart/createOrder'; //创建订单

  constructor(private http: HttpClient,
              private showMessageService: ShowMessageService,
              private globalService:GlobalService,
              ) {
  }

  /**
   * 获取记录列表
   * @param index 获取哪个记录
   * @param typeId 店铺分类Id，读取店铺分类时使用
   * @param shopId 店铺Id, 读取商品类别时使用
   * @param categoryId 商品类别Id, 读取商品信息时使用
   * @param notShowLogin  不显示loading框
   */
  getList(index: UrlInfo, typeId?: number, shopId?: number, categoryId?: number, notShowLogin?: boolean): Promise<any> {
    let self = this;
    self.urlInfo[index].dataInfo = [];
    if (!notShowLogin) {
      self.showMessageService.showLoading('数据加载中');
    }
    let token = 'Bearer ' + StorageService.read('token');
    return this.http.get<any>(this.urlInfo[index].pageUrl, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token),
      params: new HttpParams()
        .set('limit', '' + self.urlInfo[index].pageLimit)
        .set('offset', '' + self.urlInfo[index].pageIndex)
        .set('typeId', '' + typeId)
        .set('shopId', '' + shopId)
        .set('categoryId', '' + categoryId)
    }).toPromise()
      .then(function (response) {
        console.log('result(index):', response, index);
        self.showMessageService.hideLoading();
        if (response.status != 0) {
          self.urlInfo[index].dataInfo = response.data;
        }
        if (index==UrlInfo.ShopCartList){
          self.globalService.shopCartCount = 0;
          for (let i=0;i<self.urlInfo[UrlInfo.ShopCartList].dataInfo.length;i++){
            self.globalService.shopCartCount=self.globalService.shopCartCount+self.urlInfo[UrlInfo.ShopCartList].dataInfo[i].num;
          }
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

  shopCartAdd(id, num): Promise<boolean> {
    let token = 'Bearer ' + StorageService.read('token');
    let self = this;
    let bodyInfo = new HttpParams()
      .set('productId', '' + id)
      .set('num', '' + num);
    return this.http.post<any>(this.urlShopCartAdd, bodyInfo,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', token)
      }
    ).toPromise()
      .then(function (response) {
        return response.status == 1;
      })
      .catch(function (err) {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(self.urlShopCartAdd, err);//处理请求失败
        return false;
      })
  }

  shopCartProductDelete(id): Promise<any> {
    let token = 'Bearer ' + StorageService.read('token');
    let self = this;
    let bodyInfo = new HttpParams()
      .set('productId', '' + id);
    return this.http.post<any>(this.urlShopCartDelete, bodyInfo,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', token)
      }
    ).toPromise()
      .then(function (response) {
        return response.status == 1;
      })
      .catch(function (err) {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(self.urlShopCartAdd, err);//处理请求失败
        return false;
      })
  }

  shopCreateOrder(): Promise<any> {
    let token = 'Bearer ' + StorageService.read('token');
    let self = this;
    return this.http.post<any>(this.urlShopCartCreateOrder, null,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', token)
      }
    ).toPromise()
      .then(function (response) {
        return response;
      })
      .catch(function (err) {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(self.urlShopCartAdd, err);//处理请求失败
        return false;
      })
  }

  productSearch(search): Promise<any> {
    let token = 'Bearer ' + StorageService.read('token');
    let self = this;
    let bodyInfo = new HttpParams()
      .set('search', '' + search);
    return this.http.post<any>(this.urlProductSearch, bodyInfo,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', token)
      }
    ).toPromise()
      .then(function (response) {
        return response;
      })
      .catch(function (err) {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(err.error);
        }
        self.requestFailed(self.urlShopCartAdd, err);//处理请求失败
        return false;
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
