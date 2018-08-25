import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ShopService, UrlInfo as ShopUrl} from "../../providers/shop.service";
import {ProductSearchPage} from "../product-search/product-search";

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage implements OnInit {
  selectCategory: any;
  shopInfo: any;
  // shop={
  //   'id': 211,
  //   'type': 111111,
  //   'typeid': 1,
  //   'name': '项目',
  //   'description': '项目简介',
  //   'QRcode': '2322342223422',
  //   'category': '家装',
  //   'categoryid': 1,
  //   'brand': '创艺装饰',
  //   'logo': 'assets/ad/zy-logo.png'
  // };

  productCategory: any = [];
  // productCategory=[
  //   {
  //     'id':11,
  //     'name':'现代简约'
  //   },
  //   {
  //     'id':11,
  //     'name':'欧式典雅'
  //   },
  //   {
  //     'id':11,
  //     'name':'中式古典'
  //   },
  //   {
  //     'id':11,
  //     'name':'地中海'
  //   },
  //   {
  //     'id':11,
  //     'name':'东南亚'
  //   }
  // ];

  productInfo:any = [];
  // productInfo = [
  //   {
  //     'id': 123,
  //     'name': '现代简约一',
  //     'description': '现代简约一现代简约一现代简约一现代简约一现代简约一现代简约一现代简约一现代简约一现代简约一',
  //     'lowPice': '82000',
  //     'highPice': '120000',
  //     'brandId': 11,
  //     'brand': '创艺装饰',
  //     'shopId': 11,
  //     'shop': '项目',
  //     'points': 82000,
  //     'showPice': true,
  //     'productImage': [
  //       {
  //         'id': 312,
  //         'description': '现代简约1',
  //         'image': 'http://pic-bucket.nosdn.127.net/photo/0010/2017-12-25/D6GQ2A1Q2OHS0010NOS.jpg',
  //         'productid': 123
  //       },
  //       {
  //         'id': 313,
  //         'description': '现代简约2',
  //         'image': 'http://pic-bucket.nosdn.127.net/photo/0010/2017-12-25/D6GSVK9E2OHS0010NOS.jpg',
  //         'productId': 123
  //       }
  //     ],
  //     'productParam': [
  //       {
  //         'id': 412,
  //         'param': '装修类型',
  //         'description': '基础装修',
  //         'productId': 123
  //       },
  //       {
  //         'id': 413,
  //         'param': '施工工期',
  //         'description': '90',
  //         'productId': 123
  //       },
  //       {
  //         'id': 414,
  //         'param': '房屋类型',
  //         'description': '3室2厅1卫',
  //         'productId': 123
  //       }
  //     ]
  //   },
  //   {
  //     'id': 124,
  //     'name': '现代简约二',
  //     'description': '现代简约二现代简约二现代简约二现代简约二现代简约二现代简约二现代简约二现代简约二现代简约二现代简约二',
  //     'lowPice': '82000',
  //     'highPice': '120000',
  //     'brandId': 11,
  //     'brand': '创艺装饰',
  //     'shopId': 11,
  //     'shop': '项目',
  //     'points': 82000,
  //     'showPice': true,
  //     'productImage': [
  //       {
  //         'id': 312,
  //         'description': '现代简约1',
  //         'image': 'http://pic-bucket.nosdn.127.net/photo/0010/2017-12-25/D6GQ2A1Q2OHS0010NOS.jpg',
  //         'productId': 123
  //       },
  //       {
  //         'id': 313,
  //         'description': '现代简约2',
  //         'image': 'http://pic-bucket.nosdn.127.net/photo/0010/2017-12-25/D6GSVK9E2OHS0010NOS.jpg',
  //         'productId': 123
  //       }
  //     ],
  //     'productParam': [
  //       {
  //         'id': 412,
  //         'param': '装修类型',
  //         'description': '基础装修',
  //         'productId': 123
  //       },
  //       {
  //         'id': 413,
  //         'param': '施工工期',
  //         'description': '90',
  //         'productId': 123
  //       },
  //       {
  //         'id': 414,
  //         'param': '房屋类型',
  //         'description': '3室2厅1卫',
  //         'productId': 123
  //       }
  //     ]
  //   },
  //   {
  //     'id': 124,
  //     'name': '现代简约三',
  //     'description': '现代简约三现代简约三现代简约三现代简约三现代简约三现代简约三现代简约三现代简约三现代简约三现代简约三现代简约三现代简约三',
  //     'lowPice': '82000',
  //     'highPice': '120000',
  //     'brandId': 11,
  //     'brand': '创艺装饰',
  //     'shopId': 11,
  //     'shop': '项目',
  //     'points': 82000,
  //     'showPice': true,
  //     'productImage': [
  //       {
  //         'id': 312,
  //         'description': '现代简约1',
  //         'image': 'http://pic-bucket.nosdn.127.net/photo/0010/2017-12-25/D6GQ2A1Q2OHS0010NOS.jpg',
  //         'productId': 123
  //       },
  //       {
  //         'id': 313,
  //         'description': '现代简约2',
  //         'image': 'http://pic-bucket.nosdn.127.net/photo/0010/2017-12-25/D6GSVK9E2OHS0010NOS.jpg',
  //         'productId': 123
  //       }
  //     ],
  //     'productParam': [
  //       {
  //         'id': 412,
  //         'param': '装修类型',
  //         'description': '基础装修',
  //         'productId': 123
  //       },
  //       {
  //         'id': 413,
  //         'param': '施工工期',
  //         'description': '90',
  //         'productId': 123
  //       },
  //       {
  //         'id': 414,
  //         'param': '房屋类型',
  //         'description': '3室2厅1卫',
  //         'productId': 123
  //       }
  //     ]
  //   }
  // ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private shopService: ShopService,) {
    this.shopInfo = navParams.get("shop");
    console.log('this.shopInfo',this.shopInfo);
  }

  ngOnInit() {
    let self = this;
    this.shopService.getList(ShopUrl.ProductCategory, 0, self.shopInfo.id, null,true)
      .then(function (result) {
        self.productCategory = result;
        if (self.productCategory.length>0){
          self.shopService.getList(ShopUrl.Product, 0, self.shopInfo.id, self.productCategory[0].id,true)
            .then(function (result) {
              self.productInfo=result;
            })
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  categorySelected(item: any) {
    console.log('categorySelected', item);
    let self = this;
    self.selectCategory = item;
    self.shopService.getList(ShopUrl.Product, 0, self.shopInfo.id, item.id,false)
      .then(function (result) {
        self.productInfo=result;
      })
  }

  clickProduct(item: any) {
    console.log('clickProduct', item);
    this.navCtrl.push('ProductDetailPage', {
      'productItem': item
    });
  }

  goProductSearch(){
    this.navCtrl.push('ProductSearchPage');
  }
}
