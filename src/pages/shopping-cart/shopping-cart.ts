import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController} from "ionic-angular";
import {ShopService, UrlInfo} from "../../providers/shop.service";
import {ShowMessageService} from "../../providers/show-message.service";
import {AuthService} from "../../providers/auth.service";
import {GlobalService} from "../../providers/global.service";

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html'
})
export class ShoppingCartPage implements OnInit {
  countMoney: number = 0;
  countPoint: number = 0;
  shoppingCartList: any = [];
  // shoppingCartList=[
  //   {
  //     'id':112,
  //     'userId':1233,
  //     'productId':123123,
  //     'num':1,
  //     'productName':'拉菲红酒',
  //     'productPoints':2000,
  //     'productPrice':225.00,
  //     'productImage':'assets/ad/zy-logo.png'
  //   },
  //   {
  //     'id':113,
  //     'userId':1233,
  //     'productId':123123,
  //     'num':1,
  //     'productName':'拉菲红酒',
  //     'productPoints':2000,
  //     'productPrice':225.00,
  //     'productImage':'assets/ad/zy-logo.png'
  //   },
  //   {
  //     'id':114,
  //     'userId':1233,
  //     'productId':123123,
  //     'num':1,
  //     'productName':'拉菲红酒',
  //     'productPoints':2000,
  //     'productPrice':225.00,
  //     'productImage':'assets/ad/zy-logo.png'
  //   }
  // ];

  constructor(
    private navCtrl: NavController,
    private shopService: ShopService,
    private showMessageService: ShowMessageService,
    private authService: AuthService,
    private globalService:GlobalService,
    public alertCtrl: AlertController
  ) {
    //Todo 调试接口时，这里要移到获取数据时处理
    //this.count();
  }

  ngOnInit() {
    // let self = this;
    // this.shopService.getList(UrlInfo.ShopCartList)
    //   .then(function (result) {
    //     console.log('ShoppingCartPage OnInit:',result);
    //     self.shoppingCartList=result;
    //   })
  }

  ionViewWillEnter() {
    let self = this;
    this.shopService.getList(UrlInfo.ShopCartList)
      .then(function (result) {
        console.log('ShoppingCartPage OnInit:', result);
        self.shoppingCartList = result;
        self.count();
      })
  }

  count() {
    this.countMoney = 0;
    this.countPoint = 0;
    for (let i = 0; i < this.shoppingCartList.length; i++) {
      this.countMoney = this.countMoney + this.shoppingCartList[i].productInfo.lowPice * this.shoppingCartList[i].num;
      this.countPoint = this.countPoint + this.shoppingCartList[i].productInfo.lowPice * this.shoppingCartList[i].num;
    }
  }

  cartRemove(item) {
    this.changeOrder(item, "remove");
  }

  cartAdd(item) {
    this.changeOrder(item, "add");
  }

  changeOrder(item, method) {
    switch (method) {
      case "remove":
        if (item.num != 1) {
          item.num = item.num - 1;
        }
        break;
      case "add":
        if (item.num != 9) {
          item.num = item.num + 1;
        }
        break;
    }
    this.shopService.shopCartAdd(item.productId, item.num);
    this.shopService.getList(UrlInfo.ShopCartList);
    this.count();
  }

  deleteFromCart(index, item) {
    let self = this;
    this.shopService.shopCartProductDelete(item.productId)
      .then(function (result) {
        console.log('self.shoppingCartList:', self.shoppingCartList, result);
        if (result) {
          self.shoppingCartList.splice(index, 1);
          console.log('self.shoppingCartList:', self.shoppingCartList);
          self.shopService.getList(UrlInfo.ShopCartList)
            .then(function (result) {
              console.log('ShoppingCartPage OnInit:', result);
              //self.shoppingCartList=result;
            });
          self.count();
        }
      });
  }

  createOrder() {
    //this.navCtrl.push('OrderCreate',{'shoppingCartList':this.shoppingCartList});
    //this.showMessageService.showToast('商品结算即将开通！')
    let self = this;
    if (self.countMoney==0){
      self.showMessageService.showToast('请选择商品！')
    }
    this.authService.getUserInfo().then((data) => {
      let userInfo = data.userInfo;
      console.log("userLevel:", userInfo.level);
      if (userInfo.level == 9) {
        self.showMessageService.showToast('请先认证会员！')
      } else {
        console.log("cash info",userInfo,userInfo.cash , userInfo.cloudPoints,self.countMoney);
        if ((userInfo.cash + userInfo.cloudPoints) < self.countMoney) {
          let prompt = self.alertCtrl.create({
            title: '余额不足',
            message: "云积分与现金账户余额不足，是否充值？",
            buttons: [
              {
                text: '取消',
                handler: data => {
                  console.log('取消支付');
                }
              },
              {
                text: '充值',
                handler: data => {
                  console.log('进入充值');
                  self.navCtrl.push('ApplyRechargePage')
                }
              }
            ]
          });
          prompt.present();
        } else {
          self.shopService.shopCreateOrder().then((result) => {
            console.log("下单result",result);
            if (result.status == 1){
              self.globalService.shopCartCount=0;
              self.showMessageService.showToast('订单提交成功！');
              self.shoppingCartList = [];
              self.countMoney=0;
              self.countPoint=0;
            }else{
              self.showMessageService.showToast(result.data);
            }
          })
        }
      }
    });
  }
}
