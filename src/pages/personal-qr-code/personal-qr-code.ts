import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth.service";
import {BaseUrl} from "../../common/commonSet";
import {StorageService} from "../../providers/storage.service";

/**
 * Generated class for the PersonalQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-qr-code',
  templateUrl: 'personal-qr-code.html',
})
export class PersonalQrCodePage implements OnInit{

  imgQr:string ='';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService:AuthService) {
  }

  ngOnInit(){
    let self = this;
    let level = StorageService.read('level');
    console.log(level);
    if (level >3){
      this.authService.getQrInfo().then(function (result) {
        console.log('imgQr',result);
        self.imgQr=BaseUrl+'user/'+result;
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalQrCodePage');
  }

}
