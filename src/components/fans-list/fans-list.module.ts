import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FansList } from './fans-list';

@NgModule({
  declarations: [
    FansList,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    FansList
  ]
})
export class FansListModule {}
