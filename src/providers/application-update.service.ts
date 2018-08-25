import {Injectable} from "@angular/core";
import {AlertController} from "ionic-angular";
import {FileOpener} from "@ionic-native/file-opener";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";
import {AndroidPermissions} from "@ionic-native/android-permissions";

@Injectable()
export class ApplicationUpdateService{

  appBackdropFlag: boolean = false;//app是否需要下载
  downAppNum: number = 0;//下载提示信息的百分比
  downAppText: string = '';//下载提示信息
  isUpdateApplication:boolean = false;
  constructor(private alertCtrl: AlertController,
              private androidPermissions: AndroidPermissions,
              private transfer: FileTransfer, private file: File,
              private fileOpener: FileOpener,){
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.REQUEST_INSTALL_PACKAGES).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.REQUEST_INSTALL_PACKAGES)
    // );
    //
    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.REQUEST_INSTALL_PACKAGES]);
  }


  /**
   * 下载安装app/插件
   * @param fileName app/插件下载的文件名
   * @param fileUrl 下载路径
   * @param alertText 提示信息
   */
  downloadApplication(fileName, fileUrl, alertText) {
    let self = this;
      if (!self.appBackdropFlag) {
        let alert = this.alertCtrl.create({
          title: 'App下载进度：0%',
          enableBackdropDismiss: false
        });
        alert.present();
        const fileTransfer: FileTransferObject = this.transfer.create();
        const apk = this.file.externalApplicationStorageDirectory + fileName; //apk保存的目录
        //const apk = this.file.dataDirectory + fileName; //apk保存的目录
        console.log("下载apk文件名:" + apk);
        console.log("下载apk链接:" + fileUrl);
        fileTransfer.download(fileUrl, apk).then(() => {
          self.downAppNum = 100;
          self.fileOpener.open(apk, 'application/vnd.android.package-archive')
            .then(() => console.log('apk is opened'))
            .catch(e => console.log('Error openening apk', e));
        });

        fileTransfer.onProgress((event: ProgressEvent) => {
          self.downAppNum = Math.floor(event.loaded / event.total * 100);
          if (self.downAppNum === 100) {
            self.appBackdropFlag = false;
            alert.dismiss();
          } else {
            let title = document.getElementsByClassName('alert-title')[0];
            self.downAppText = '('+event.loaded + '/' + event.total +')'+ alertText + self.downAppNum + '%';
            title && (title.innerHTML = self.downAppText);
          }
        });
      } else {
        if (self.downAppNum === 100) {
          self.appBackdropFlag = false;
        } else {
          let alert = this.alertCtrl.create({
            title: self.downAppText,
            enableBackdropDismiss: false,
            buttons: [
              {
                text: "后台下载",
                handler: () => {
                  self.appBackdropFlag = true;
                }
              }
            ]
          });
          alert.present();
        }
      }
  }
}
