import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ShopService, UrlInfo as ShopUrl} from "../../providers/shop.service";
import {AdService, UrlInfo as AdUrl} from "../../providers/ad.service";
import {ProductSearchPage} from "../product-search/product-search";

/**
 * Generated class for the ClassificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-classification',
  templateUrl: 'classification.html',
})
export class ClassificationPage implements OnInit {
  shopTypeList: any = [];
  shopList: any = [];
  adBanner: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private shopService: ShopService,
              private adService: AdService,) {
  }

  /**
   * 页面初始化
   */
  ngOnInit() {
    let self = this;
    Promise.all([
      this.shopService.getList(ShopUrl.ShopType),
      this.adService.getList(AdUrl.Classification_One),
    ]).then(function (result) {
      console.log('listData', result);
      if (typeof result[0] != 'undefined') {
        self.shopTypeList = result[0];
        if (self.shopTypeList.length>0){
          //console.log('self.shopTypeList[0]',self.shopTypeList[0]);
          self.shopService.getList(ShopUrl.ShopList,self.shopTypeList[0].num,null,null,true)
            .then(function (result) {
              console.log('ShopList', result);
              if (typeof result != 'undefined') {
                self.shopList = result;
              }
            })
        }
      }
      if (typeof result[1] != 'undefined') {
        self.adBanner = result[1];
      }
    })
    // this.shopService.getList(UrlInfo.ShopType).then(
    //   listData => {
    //     console.log('listData', listData);
    //     if (typeof listData != 'undefined'){
    //       self.shopTypeList=listData;
    //     }
    //   }
    // )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassificationPage');
  }

  /**
   * 处理店铺点击事件
   * @param item  点击哪一个店铺
   */
  onClickShop(item) {
    console.log('ClassificationPage.onClickShop', item);
    this.navCtrl.push('ShopPage',{'shop':item});
  }

  /**
   * 处理店铺分类点击事件
   * @param item  点击哪一个店铺分类
   */
  onClickType(item){
    console.log('ClassificationPage.onClickType', item);
    let self = this;
    this.shopService.getList(ShopUrl.ShopList,item.num)
      .then(function (result) {
        console.log('ShopList', result);
        if (typeof result != 'undefined') {
          self.shopList = result;
        }
      })
  }

  goProductSearch(){
    this.navCtrl.push('ProductSearchPage');
  }
}
