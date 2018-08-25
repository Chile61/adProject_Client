import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrderPage } from './my-order';
import {OrderService} from "../../providers/order.service";

@NgModule({
  declarations: [
    MyOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(MyOrderPage),
  ],
  providers:[
    OrderService,
  ]
})
export class MyOrderPageModule {}
