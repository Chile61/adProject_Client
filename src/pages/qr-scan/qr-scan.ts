import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {ShowMessageService} from "../../providers/show-message.service";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
/**
 * Generated class for the QrScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-scan',
  templateUrl: 'qr-scan.html',
})
export class QrScanPage {

  light: boolean;//判断闪光灯
  frontCamera: boolean;//判断摄像头

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private qrScanner: QRScanner,
              private showMessageService:ShowMessageService,
              public events: Events,
              private viewCtrl: ViewController) {
    //默认为false
    this.light = false;
    this.frontCamera = false;
  }

  ionViewDidLoad() {
    this.showCamera();
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('QR Text:', text);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            // let qrData;
            // try {
            //   qrData = JSON.parse(text);
            // } catch (e) {
            //   console.log('ngOnInit', e);
            //   this.navCtrl.pop();
            //   this.showMessageService.showToast('错误的二维码信息！');
            //   return
            // }
            //
            // if (qrData.status==1){
              this.events.publish('msg:scanRegister', text);
              //this.hideCamera();
            // }

            this.navCtrl.pop();
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }


  /**
   * 闪光灯控制，默认关闭
   */
  toggleLight() {
    if (this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  }

  /**
   * 前后摄像头互换
   */
  toggleCamera() {
    if (this.frontCamera) {
      this.qrScanner.useBackCamera();
    } else {
      this.qrScanner.useFrontCamera();
    }
    this.frontCamera = !this.frontCamera;
  }

  showCamera() {
    console.log('showCamera');
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  ionViewWillLeave() {
    this.hideCamera();
  }

}
