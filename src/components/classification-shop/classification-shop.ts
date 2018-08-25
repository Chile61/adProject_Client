import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'classification-shop',
  templateUrl: 'classification-shop.html'
})
export class ClassificationShop implements OnChanges {
  @Input() classificationShopInfo: any = [];
  @Input() classificationShopBannerAD: any = [];
  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();
  testClassificationShopBannerADData = [
    {
      'id': 111111,
      'title': '测试一下1',
      'type': '图片广告',
      'position': '首页滚动',
      'userid': 123123,
      'shopid': 123,
      'brandid': 123,
      'productid': 21,
      'articleid': 563,
      'starttime': '2017-07-15 13:14:15',
      'endtime': '2017-07-15 13:14:15',
      'image': 'assets/ad/ad-zy.png',
      'lowprice': 123.3,
      'highprice': 150,
      'sortnum': 1,
      'col': 4
    }
  ];

  testClassificationShopData = [
    {
      'id': 211,
      'type': 111111,
      'typeid': 1,
      'name': '项目',
      'description': '项目简介',
      'QRcode': '2322342223422',
      'category': '家装',
      'categoryid': 1,
      'brand': '创艺装饰',
      'logo': 'assets/ad/zy-logo.png'
    },
    {
      'id': 211,
      'type': 111111,
      'typeid': 1,
      'name': '项目',
      'description': '项目简介',
      'QRcode': '2322342223422',
      'category': '家装',
      'categoryid': 1,
      'brand': '创艺装饰',
      'logo': 'assets/ad/zy-logo.png'
    },
    {
      'id': 211,
      'type': 111111,
      'typeid': 1,
      'name': '项目',
      'description': '项目简介',
      'QRcode': '2322342223422',
      'category': '家装',
      'categoryid': 1,
      'brand': '创艺装饰',
      'logo': 'assets/ad/zy-logo.png'
    },
    {
      'id': 211,
      'type': 111111,
      'typeid': 1,
      'name': '项目',
      'description': '项目简介',
      'QRcode': '2322342223422',
      'category': '家装',
      'categoryid': 1,
      'brand': '创艺装饰',
      'logo': 'assets/ad/zy-logo.png'
    }
  ];


  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes['classificationShopInfo']);
  }

  constructor() {
    this.classificationShopBannerAD = this.testClassificationShopBannerADData;
    this.classificationShopInfo = this.testClassificationShopData;
    console.log('Hello ClassificationShop Component');
  }

  onClickItem(item) {
    console.log('ClassificationLeft.onClickItem', item);
    this.clickItem.emit(item);
  }


}
