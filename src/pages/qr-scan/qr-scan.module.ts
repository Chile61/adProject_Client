import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrScanPage } from './qr-scan';
import {ShowMessageService} from "../../providers/show-message.service";
import {QRScanner} from "@ionic-native/qr-scanner";

@NgModule({
  declarations: [
    QrScanPage,
  ],
  imports: [
    IonicPageModule.forChild(QrScanPage),
  ],
  providers: [
    QRScanner,
    ShowMessageService
  ]
})
export class QrScanPageModule {}
