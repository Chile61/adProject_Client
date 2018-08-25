import {Component, Input, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';


/**
 * Generated class for the WorkList component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'log-list',
  templateUrl: 'log-list.html'
})
export class LogList implements OnChanges {
  @Input() logInfo: any = [];

  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();
  testData = [
    {
      'id': 111111,
      'operatorId': 123,
      'userId': 123,
      'points': 20000,
      'dateTime': '2017-11-22 18:36'
    },
    {
      'id': 111112,
      'operatorId': 123,
      'userId': 123,
      'points': 20000,
      'dateTime': '2017-11-22 18:36'
    },
    {
      'id': '111113',
      'operatorId': 123,
      'userId': 123,
      'points': 20000,
      'dateTime': '2017-11-22 18:36'
    },
    {
      'id': '111114',
      'operatorId': 123,
      'userId': 123,
      'points': 20000,
      'dateTime': '2017-11-22 18:36'
    }
  ];

  constructor() {
    this.logInfo=this.testData;
    console.log('Hello ApplyList Component');
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'dataInfo') {

      }
    }
  }

  onClickItem(item) {
    console.log('log-list.onClickItem', item);
    this.clickItem.emit(item);
  }
}
