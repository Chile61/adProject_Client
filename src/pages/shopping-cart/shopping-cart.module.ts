import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCartPage } from './shopping-cart';
import {ShopService} from "../../providers/shop.service";
import {ShowMessageService} from "../../providers/show-message.service";
import {AuthService} from "../../providers/auth.service";
import {GlobalService} from "../../providers/global.service";

@NgModule({
  declarations: [
    ShoppingCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCartPage),
  ],
  providers: [
    ShopService,
    AuthService,
    ShowMessageService
  ]
})
export class ShoppingCartModule {}
