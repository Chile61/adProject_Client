import {Component, OnInit} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from "ionic-angular";

/**
 * Generated class for the OrderCreate page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-create',
  templateUrl: 'order-create.html',
})
export class OrderCreate implements OnInit {
  countMoney:number=0;
  countPoint:number=0;

  memberAddress = [
    {
      'id': 1,
      'shipAddress':'广西柳州',
      'shipMobile': '13800138000',
      'shipName':'张三',
      'default':true
    },
    {
      'id': 2,
      'shipAddress':'广西柳州',
      'shipMobile': '13800138000',
      'shipName':'张三',
      'default':false
    }
  ];
  orderCartList: any;

  orderCreate: any = {
    'userId': 123,
    'addressId': 1,
    'shipAddress': '广西柳州',
    'shipMobile': '13800138000',
    'shipName': '张三',
    'remark': '123',
    'orderProduct': [
      {
        'productId': 1123,
        'num': 1
      },
      {
        'productId': 321,
        'num': 2
      },
    ]
  };

  constructor(public navCtrl: NavController,
              private events: Events,
              public navParams: NavParams,) {
    this.orderCartList = navParams.get('shoppingCartList');
  }

  count(){
    this.countMoney=0;
    this.countPoint=0;
    for(let i=0;i<this.orderCartList.length;i++){
      this.countMoney=this.countMoney+this.orderCartList[i].productPrice*this.orderCartList[i].num;
      this.countPoint=this.countPoint+this.orderCartList[i].productPoints*this.orderCartList[i].num;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderCreate');
    let self = this;
    this.events.subscribe('msg:changeAddress', function (item) {
      console.log('item', item);
      self.orderCreate.addressId = item.id;
      self.orderCreate.shipAddress = item.shipAddress;
      self.orderCreate.shipMobile = item.shipMobile;
      self.orderCreate.shipName = item.shipName;
    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad OrderCreate');
  }

  ngOnInit() {

  }

  ionViewWillLeave() {

  }

  selectAddress() {
    this.navCtrl.push('Address', {'memberAddress': this.memberAddress});
  }

  submitOrder() {

  }
}
