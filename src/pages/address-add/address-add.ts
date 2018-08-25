import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ShowMessageService} from "../../providers/show-message.service";

/**
 * Generated class for the AddressAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-address-add',
  templateUrl: 'address-add.html',
})
export class AddressAddPage {

  addressInfo: any = {
    'userId': '',
    'shipAddress': '',
    'shipMobile': '',
    'shipName': '',
    'default': false,
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private showMessageService: ShowMessageService) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressAddPage');
  }


  saveAddress() {
    this.showMessageService.showToast('保存成功');
    this.navCtrl.pop();
  }

}
