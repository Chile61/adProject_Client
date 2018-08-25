import {Component, Input, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';


/**
 * Generated class for the WorkList component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'data-list',
  templateUrl: 'data-list.html'
})
export class DataList implements OnChanges {
  @Input() dataInfo: any = [];

  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();
  testData = [
    {
      'id': 111111,
      'type': '转入',
      'typeShow': '入',
      'description': '购买装修获得积分',
      'points': 20000,
      'dateTime': '2017-11-22 18:36',
      'typeColor': "secondary"
    },
    {
      'id': 111112,
      'type': '转入',
      'typeShow': '入',
      'description': '购买装修获得积分',
      'points': 20000,
      'dateTime': '2017-11-22 18:36',
      'typeColor': "secondary"
    },
    {
      'id': '111113',
      'type': '转出',
      'typeShow': '出',
      'description': '每日积分转换',
      'points': 3300.50,
      'dateTime': '2017-11-22 18:36',
      'typeColor': "danger"
    },
    {
      'id': '111114',
      'type': '转出',
      'typeShow': '出',
      'description': '每日积分转换',
      'points': 3200.50,
      'dateTime': '2017-11-23 18:36',
      'typeColor': "danger"
    }
  ];

  constructor() {
    this.dataInfo=this.testData;
    console.log('Hello DataList Component');
  }

  ngOnChanges(changes: SimpleChanges) {
    let self = this;
    for (let propName in changes) {
      if (propName === 'dataInfo') {
        for (let i = 0; i < self.dataInfo.length; i++) {
          console.log('self.dataInfo[i].typeColor:', self.dataInfo[i].typeColor);
          if (typeof(self.dataInfo[i]).typeColor == "undefined") {
            self.dataInfo[i].typeColor = "primary";
          }
        }
      }
    }
  }

  onClickItem(item) {
    console.log('data-list.onClickItem', item);
    this.clickItem.emit(item);
  }
}
