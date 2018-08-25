import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ShopService} from "../../providers/shop.service";

/**
 * Generated class for the ProductSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-search',
  templateUrl: 'product-search.html',
})
export class ProductSearchPage {
  productInfo:any = [];

  constructor(public navCtrl: NavController,
              private shopService:ShopService,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductSearchPage');
  }

  clickProduct(item: any) {
    console.log('clickProduct', item);
    this.navCtrl.push('ProductDetailPage', {
      'productItem': item
    });
  }

  searchProduct(ev: any) {
    // Reset items back to all of the items
    this.productInfo=[];

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    this.shopService.productSearch(val).then((result)=>{
      console.log("searchProduct",result);
      if (result.status==1){
        this.productInfo=result.data;
      }
    })
  }
}
