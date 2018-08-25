import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetail } from './order-detail';
import {OrderService} from "../../providers/order.service";

@NgModule({
  declarations: [
    OrderDetail,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetail),
  ],
  providers:[
    OrderService
  ]
})
export class OrderDetailModule {}
