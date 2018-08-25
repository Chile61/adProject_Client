import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  工具类，提供数据存储
*/
@Injectable()
export class StorageService {
  constructor() {

  }

  /**
   * 写入本地存储字符
   * @param key 键
   * @param value 值
   */
  public static write(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  /**
   * 读取本地存储字符
   * @param key 键
   */
  public static read<T>(key:string):T {
    let value:string = localStorage.getItem(key);

    if (value && value != "undefined" && value != "null") {
      return <T>JSON.parse(value);
    }

    return null;
  }

  /**
   * 删除本地存储字符
   * @param key 键
   */
  public static remove(key:string) {
    localStorage.removeItem(key);
  }

  /**
   * 清空本地存储字符
   */
  public static clear() {
    localStorage.clear();
  }

}
