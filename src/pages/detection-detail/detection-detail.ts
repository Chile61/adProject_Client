import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the DetectionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detection-detail',
  templateUrl: 'detection-detail.html',
})
export class DetectionDetailPage {
  detectionDetail={

  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private domSanitizer: DomSanitizer) {
    this.detectionDetail = navParams.get('detectionItem');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetectionDetailPage');
  }

  assembleHTML(strHTML:any) {
    return this.domSanitizer.bypassSecurityTrustHtml(strHTML);
  }
}
