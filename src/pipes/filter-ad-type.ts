import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterADType',
})
export class FilterADType implements PipeTransform {
  transform(items: any[], adType: any, position:any): any {
    //console.log('FilterADType',items,adType,position);
    if (!items || !adType || !position) {
      return items;
    }
    if (items.length==0){
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item => item.type == adType && item.position ==position);
  }
}
