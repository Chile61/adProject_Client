import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderCreate } from './order-create';

@NgModule({
  declarations: [
    OrderCreate,
  ],
  imports: [
    IonicPageModule.forChild(OrderCreate),
  ],
})
export class OrderCreateModule {}
