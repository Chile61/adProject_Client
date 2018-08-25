import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DataList } from './data-list';

@NgModule({
  declarations: [
    DataList,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    DataList
  ]
})
export class DataListModule {}
