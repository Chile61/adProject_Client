import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {OrderService} from "../../providers/order.service";

/**
 * Generated class for the MyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage implements OnInit {
  orderState = 0;
  orderList = [
    // {
    //   'id': 123,
    //   'sn': 'BASSSF222',
    //   'userId': 123,
    //   'userName': '张三',
    //   'shopId': 123,
    //   'shopName': '红酒世家',
    //   'money':348.30,
    //   'createTime': '2017-12-31 12:12:36',
    //   'shipAddress': '广西柳州',
    //   'shipName': '李四',
    //   'shipMobile': '13800138000',
    //   'remark': '1231231saaf',
    //   'state': 1,
    //   'stateShow': '已付款',
    //   'product': [
    //     {
    //       'productId':123,
    //       'productName':'蓝栎1887',
    //       'image':'assets/ad/zy-logo.png',
    //       'num':1,
    //       'price':288.30,
    //       'point':80,
    //     },
    //     {
    //       'productId':123,
    //       'productName':'蓝栎1887',
    //       'image':'assets/ad/zy-logo.png',
    //       'num':1,
    //       'price':288.30,
    //       'point':80,
    //     }
    //   ]
    // },
    // {
    //   'id': 124,
    //   'sn': 'BASSSF222',
    //   'userId': 123,
    //   'userName': '张三',
    //   'shopId': 123,
    //   'shopName': '红酒世家',
    //   'money':348.30,
    //   'createTime': '2017-12-31 12:12:36',
    //   'shipAddress': '广西柳州',
    //   'shipName': '李四',
    //   'shipMobile': '13800138000',
    //   'remark': '1231231saaf',
    //   'state': 1,
    //   'stateShow': '已付款',
    //   'product': [
    //     {
    //       'productId':123,
    //       'productName':'蓝栎1887',
    //       'image':'assets/ad/zy-logo.png',
    //       'num':1,
    //       'price':288.30,
    //       'point':80,
    //     },
    //     {
    //       'productId':123,
    //       'productName':'蓝栎1887',
    //       'image':'assets/ad/zy-logo.png',
    //       'num':1,
    //       'price':288.30,
    //       'point':80,
    //     }
    //   ]
    // }
  ];

  orderItem = [
    //状态 0未付款 1待发货 2待收货 3已收货 4退货中 5已退货 6已完成
    {
      title: '全部',
      orderType: -1,
    },
    {
      title: '未付款',
      orderType: 0,
    },
    {
      title: '待发货',
      orderType: 1
    },
    {
      title: '待收货',
      orderType: 2
    },
    {
      title: '已收货',
      orderType: 3
    },
    {
      title: '退货中',
      orderType: 4
    },
    {
      title: '已退货',
      orderType: 5
    },
    {
      title: '已完成',
      orderType: 6
    }
  ];

  ngOnInit() {
    console.log('ngOnInit', this.orderState);

    this.getOrderList(-1);
  }

  constructor(public navCtrl: NavController,
              private orderService:OrderService,
              public navParams: NavParams) {
    this.orderState = navParams.get('state');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrderPage');
  }

  onClick(item) {
    console.log('onClick(item)', item);
    this.orderState = item.orderType;
    this.getOrderList(this.orderState);
  }

  //滑动刷新
  doInfinite(infiniteScroll) {
    console.log('滑动刷新定单列表');
    setTimeout(() => {
      // this.getOrderList(PageDo.pdNext);
      console.log('滑动刷新定单列表完成');
      infiniteScroll.complete();
    }, 1000);
  }

  showDetail(id) {
    console.log('show   OrderDetail!');
    this.navCtrl.push('OrderDetail', {orderId: id});
  }

  getOrderList(state){
    this.orderService.getList(0,state).then((data)=>{
      console.log("getOrderList:",data);
      for (let i=0;i<data.length;i++){
        switch (data[i].state){
          case 0:
            data[i].stateShow="未付款";
            break;
          case 1:
            data[i].stateShow="待发货";
            break;
          case 2:
            data[i].stateShow="待收货";
            break;
          case 3:
            data[i].stateShow="已收货";
            break;
          case 4:
            data[i].stateShow="退货中";
            break;
          case 5:
            data[i].stateShow="已退货";
            break;
          case 6:
            data[i].stateShow="已完成";
            break;
        }
      }
      this.orderList=data;
    })
  }
}
