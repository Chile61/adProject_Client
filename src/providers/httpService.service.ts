/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {TimeoutError} from "rxjs"
import {Observable} from 'rxjs/Observable';
import {ShowMessageService} from "./show-message.service";

@Injectable()
export class HttpService {

  constructor(public http: HttpClient,
              private showMessageService: ShowMessageService) {
  }

  /**
   * 统一调用此方法显示loading
   * @param url url地址
   * @param body 数据内容
   * @param options 传递参数对像:headers,params
   * @param showLoad 是否显示loading框
   */
  public to(url: string, body: any = {}, options: any = {}, showLoad: boolean): Observable<Response> {
    let self = this;
    if (showLoad) {
      console.log('showLoading!');
      self.showMessageService.showLoading('数据加载中');
    }
    return Observable.create(observer => {
        self.http.post(url, body, options)
          .subscribe(
            res => {
              console.log('post:',res);
              if (showLoad) {
                self.showMessageService.hideLoading();
                console.log('showMessageService.hideLoading()');
              }
              if (res['_body'] == '') {
                res['_body'] = null;
              }
              observer.next(res);
            },(err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('An error occurred:', err.error.message);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
              }

              this.requestFailed(url, err);//处理请求失败
              observer.error('this.requestFailed',err);
            }
          )
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
    let msg = '请求发生异常';
    switch (status) {
      case 0:
        msg = '请求失败，请求响应出错';
        break;
      case 404:
        msg = '请求失败，未找到请求地址';
        break;
      case 500:
        if (err['_body'].indexOf("user_login_time_out")) {
          msg = '由于您长时间没有操作,连接已失效!请您重新登录!';
          //Todo 以后再修改
          //this.auth.setActiveLogin(false);
        } else {
          msg = '请求失败，服务器出错，请稍后再试';
        }
        break;
    }
    this.showMessageService.alert(msg);
    return
  }
}
