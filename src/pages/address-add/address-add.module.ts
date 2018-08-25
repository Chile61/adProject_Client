import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressAddPage } from './address-add';
import {ShowMessageService} from "../../providers/show-message.service";

@NgModule({
  declarations: [
    AddressAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressAddPage),
  ],
  providers:[
    ShowMessageService,
  ]
})
export class AddressAddPageModule {}
