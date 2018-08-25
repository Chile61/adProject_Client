import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

/**
 * Generated class for the HomeInfo component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'home-info',
  templateUrl: 'home-info.html'
})
export class HomeInfo implements OnChanges{
  canShow:boolean=false;
  @Input() adInfo: any = [];
  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();
  // testADData = [
  //   {
  //     'id': 111111,
  //     'title':'测试一下1',
  //     'type':'图片广告',
  //     'position': '首页滚动',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/2018-1.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':1,
  //     'col':4
  //   },
  //   {
  //     'id': 111112,
  //     'title':'测试一下1',
  //     'type':'图片广告',
  //     'position': '首页滚动',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/2018-2.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':2,
  //     'col':4
  //   },
  //   {
  //     'id': 111113,
  //     'title':'测试一下1',
  //     'type':'图片广告',
  //     'position': '首页滚动',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-1.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':3,
  //     'col':4
  //   },
  //   {
  //     'id': 111114,
  //     'title':'测试一下1',
  //     'type':'图片广告',
  //     'position': '首页滚动',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-1.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':4,
  //     'col':4
  //   },
  //   {
  //     'id': 111121,
  //     'title':'招商进行中，好礼送不断',
  //     'type':'图片广告',
  //     'position': '首页图片一',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-2.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':5,
  //     'col':4
  //   },
  //   {
  //     'id': 111122,
  //     'title':'招商进行中，好礼送不断',
  //     'type':'图片广告',
  //     'position': '首页图片一',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-2.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':6,
  //     'col':4
  //   },
  //   {
  //     'id': 111123,
  //     'title':'招商进行中，好礼送不断',
  //     'type':'图片广告',
  //     'position': '首页图片一',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-2.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':7,
  //     'col':4
  //   },
  //   {
  //     'id': 111124,
  //     'title':'招商进行中，好礼送不断',
  //     'type':'图片广告',
  //     'position': '首页图片二',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-3.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':8,
  //     'col':4
  //   },
  //   {
  //     'id': 111125,
  //     'title':'招商进行中，好礼送不断',
  //     'type':'图片广告',
  //     'position': '首页图片二',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-3.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':8,
  //     'col':4
  //   },
  //   {
  //     'id': 111126,
  //     'title':'招商进行中，好礼送不断',
  //     'type':'图片广告',
  //     'position': '首页图片二',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-3.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':8,
  //     'col':4
  //   },
  //   {
  //     'id': 112124,
  //     'title':'招商进行中，好礼送不断',
  //     'type':'图片广告',
  //     'position': '首页图片三',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-4.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':8,
  //     'col':4
  //   },
  //   {
  //     'id': 112125,
  //     'title':'招商进行中，好礼送不断',
  //     'type':'图片广告',
  //     'position': '首页图片三',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-4.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':8,
  //     'col':4
  //   },
  //   {
  //     'id': 112126,
  //     'title':'招商进行中，好礼送不断',
  //     'type':'图片广告',
  //     'position': '首页图片三',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-4.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':8,
  //     'col':4
  //   },
  //   {
  //     'id': 111131,
  //     'title':'招商进行中，好礼送不断',
  //     'type':'公告',
  //     'position': '首页公告',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-4.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':8,
  //     'col':4
  //   },
  //   {
  //     'id': 111132,
  //     'title':'首批入驻，分享大礼包',
  //     'type':'公告',
  //     'position': '首页公告',
  //     'userid': 123123,
  //     'shopid': 123,
  //     'brandid': 123,
  //     'productid': 21,
  //     'articleid': 563,
  //     'starttime': '2017-07-15 13:14:15',
  //     'endtime': '2017-07-15 13:14:15',
  //     'image': 'assets/ad/ad-4.png',
  //     'lowprice': 123.3,
  //     'highprice': 150,
  //     'sortnum':8,
  //     'col':4
  //   }
  // ];


  ngOnChanges(changes: SimpleChanges) {
    console.log('this.adInfo',this.adInfo);
    if (this.adInfo.length>0) {
      this.canShow = true;
    }
  }


  constructor(
  ) {
    // this.adInfo=this.testADData;
    console.log('Hello HomeInfo Component');
  }

  onClickItem(item) {
    console.log('HomeInfo.onClickItem', item);
    this.clickItem.emit(item);
  }

}
