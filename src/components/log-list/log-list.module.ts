import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LogList } from './log-list';

@NgModule({
  declarations: [
    LogList,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    LogList
  ]
})
export class LogListModule {}
