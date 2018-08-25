import * as moment from 'moment';

export const ExtensionName = ["rtf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf", "jpg", "jpe", "jpeg", "png", "bmp", "tif", "tiff", "xps", "cbz", "jfif", "jfif-tbnl", "gif"];

export class OfficeFunction {
  static isTrueType(type): boolean {
    let types = ["rtf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf", "jpg", "jpe", "jpeg", "png", "bmp", "tif", "tiff", "xps", "cbz", "jfif", "jfif-tbnl", "gif"];
    if (type != null || type != "undefined" || type != undefined) {
      for (let i = 0, len = types.length; i < len; i++) {
        if (type.toLowerCase() == types[i]) {
          return true;
        }
      }
      return false;
    }
  }

  /**
   * 判断是否为office格式的文档
   */
  static isOfficeType(type): boolean {
    let types = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"];
    if (type != null && type != "undefined" && type != undefined) {
      for (let i = 0, len = types.length; i < len; i++) {
        if (type.toLowerCase() == types[i]) {
          return true;
        }
      }
      return false;
    }
  }

  /**
   * 根据后缀名判断是否为图片
   *
   */
  static isImageType(type): boolean {
    let types = ["jpg", "png", "tiff", "bmp", "gif", "tif"];
    if (type != null && type != "undefined" && type != undefined) {
      for (let i = 0, len = types.length; i < len; i++) {
        if (type.toLowerCase() == types[i]) {
          return true;
        }
      }
      return false;
    }
  }


//格式化文件大小，以合适的单位显示
  static formatFileSize(size): string {
    if (size == undefined) {
      return "";
    }
    if (size > 1024 * 1024) {
      let tmp = size / (1024 * 1024)
      if (tmp - Math.floor(tmp) < 0.1) {
        return Math.floor(tmp) + "MB";
      } else {
        return tmp.toFixed(2) + "MB";
      }
    } else if (size > 1024) {
      let tmp = size / 1024;
      if (tmp - Math.floor(tmp) < 0.1) {
        return Math.floor(tmp) + "KB";
      } else {
        return tmp.toFixed(2) + "KB";
      }
    } else {
      return size + "B";
    }

  }

}

//倒计时
export class Tict {
  ticts: any = [];

  createTicts(id, dealline) {
    let time = moment(dealline).diff(moment());
    let self = this;
    console.log('Tict', self.ticts[id]);
    if (typeof self.ticts[id] == 'undefined') {
      self.ticts[id] = {
        dealine: dealline
        , id: id
        , time: time
        , interval: setInterval(function () {
          //js默认时间戳为毫秒,需要转化成秒
          let t = self.ticts[id].time / 1000;
          let d = Math.floor(t / (24 * 3600));
          let h = Math.floor((t - 24 * 3600 * d) / 3600);
          let m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
          let s = Math.floor((t - 24 * 3600 * d - h * 3600 - m * 60));
          //这里可以做一个格式化的处理,甚至做毫秒级的页面渲染,基于DOM操作,太多个倒计时一起会导致页面性能下降
          document.getElementById(id).innerHTML = '剩余时间：' + d + '天' + h + '小时' + m + '分钟' + s + '秒';
          self.ticts[id].time -= 1000;
          if (self.ticts[id].time < 0) {
            console.log('小于0了');
            document.getElementById(id).innerHTML = '超时';
            self.deleteTicts(id);//判断是否到期,到期后自动删除定时器
          }
        }, 1000)
      };
    }
  };

  deleteTicts(id) {
    console.log('应该是有的。', this.ticts[id]);
    clearInterval(this.ticts[id].interval);//清楚定时器的方法,需要定时器的指针作为参数传入clearInterval
    delete this.ticts[id];//通过delete的方法删除对象中的属性
    console.log('看看还有吗？', this.ticts[id]);
  };
}
