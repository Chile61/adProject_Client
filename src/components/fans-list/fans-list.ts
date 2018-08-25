import {Component, Input, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';


/**
 * Generated class for the ResponsibilityList component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fans-list',
  templateUrl: 'fans-list.html'
})
export class FansList implements OnChanges {
  @Input() info: any = [];

  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickShowDetail: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickTransfer: EventEmitter<any> = new EventEmitter<any>();
  testData = [
    {
      'id': '122',
      'account': 'abbc123',
      'avatar':'assets/imgs/logo.png',
      'level': 1,
      'levelShow': '消费商',
      'createtime': '2017-11-28'
    },
    {
      'id': '123',
      'account': 'aabbcc',
      'avatar':'assets/imgs/logo.png',
      'level': 1,
      'levelShow': '消费商',
      'createtime': '2017-11-28'
    },
    {
      'id': '124',
      'account': 'ffgg',
      'avatar':'assets/imgs/logo.png',
      'level': 1,
      'levelShow': '消费商',
      'createtime': '2017-11-28'
    },
    {
      'id': '125',
      'account': 'ddaa',
      'avatar':'assets/imgs/logo.png',
      'level': 1,
      'levelShow': '消费商',
      'createtime': '2017-11-28'
    }
  ];

  constructor() {
    console.log('Hello FansList Component');
    this.info=this.testData;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'info') {

      }
    }
  }

  onClickItem(item) {
    console.log('FansList.onClickItem', item);
    this.clickItem.emit(item);
  }

  onClickShowDetail(item) {
    console.log('FansList.onClickShowDetail', item);
    this.clickShowDetail.emit(item);
  }

  onClickTransfer(item) {
    console.log('FansList.onClickTransfer', item);
    this.clickTransfer.emit(item);
  }

}
