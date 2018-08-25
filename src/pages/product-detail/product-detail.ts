import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import {ShopService, UrlInfo} from "../../providers/shop.service";
import {GlobalService} from "../../providers/global.service";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage implements OnInit{
  productItem:any;
  //shopCartCount:number =0;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private shopService:ShopService,
              public globalService:GlobalService,
              private domSanitizer: DomSanitizer) {
    this.productItem = navParams.get('productItem');
  }

  ngOnInit(){
    console.log('this.shopService.urlInfo[UrlInfo.ShopCartList].dataInfo',this.shopService.urlInfo[UrlInfo.ShopCartList].dataInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  assembleHTML(strHTML:any) {
    return this.domSanitizer.bypassSecurityTrustHtml(strHTML);
  }

  buy(){
    let self = this;
    let item=this.shopService.urlInfo[UrlInfo.ShopCartList].dataInfo
      .find(item=>item.productId=self.productItem.id);
    console.log('buy():',item);
    console.log('buy():',self.productItem);
    if (item==null){
      self.shopService.shopCartAdd(self.productItem.id,1)
        .then(function (res) {
          if (res){
            self.shopService.getList(UrlInfo.ShopCartList);
            self.globalService.shopCartCount=self.globalService.shopCartCount+1;
          }
        })
    }else{
      self.shopService.shopCartAdd(item.productId,item.num+1)
        .then(function (res) {
          if (res){
            item.num=item.num+1;
            self.globalService.shopCartCount=self.globalService.shopCartCount+1;
          }
        })
    }
  }
}
