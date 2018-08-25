import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

/**
 * Generated class for the ClassificationLeftComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'classification-left',
  templateUrl: 'classification-left.html'
})
export class ClassificationLeft implements OnChanges{
  selectItem:any;
  @Input() classificationInfo: any = [];
  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();
  testClassificationData = [
    {
      'id': 111111,
      'name':'餐饮美食',
    },
    {
      'id': 111112,
      'name':'精品家装',
    },
    {
      'id': 111113,
      'name':'家用电器',
    },
    {
      'id': 111114,
      'name':'智能设备',
    },
    {
      'id': 111121,
      'name':'母婴健康',
    },
  ];


  ngOnChanges(changes: SimpleChanges) {
    let self = this;
    for (let propName in changes) {
      if (propName === 'classificationInfo') {
        if (self.classificationInfo.length>0){
          console.log(self.classificationInfo.length);
          self.selectItem = self.classificationInfo[0];
        }
      }
    }
  }

  constructor() {
    //this.classificationInfo=this.testClassificationData;
    //this.selectItem = this.classificationInfo[0];
    console.log('Hello ClassificationLeft Component');
  }

  onClickItem(item) {
    console.log('ClassificationLeft.onClickItem', item);
    this.selectItem = item;
    this.clickItem.emit(item);
  }

}
