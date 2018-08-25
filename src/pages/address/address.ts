import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from "ionic-angular";
import {AddressAddPage} from "../address-add/address-add";

/**
 * Generated class for the AddressSelect page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class Address{

  addressList:any;

  isEdit:boolean = false;
  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                private events: Events,
                ) {
    this.addressList=navParams.get('memberAddress');
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad AddressSelect');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressSelect');
  }

  ionViewWillLeave() {

  }

  selectAddress(item){
    console.log('changeAddress',item);
    if (!this.isEdit){
      this.events.publish('msg:changeAddress', item);
      this.navCtrl.pop();
    }
  }

  edit(){
    this.isEdit=true;
  }

  cancelEdit(){
    this.isEdit=false;
  }

  addAddress(){
    this.navCtrl.push('AddressAddPage')
  }
}
