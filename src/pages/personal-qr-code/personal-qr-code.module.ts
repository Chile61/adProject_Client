import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalQrCodePage } from './personal-qr-code';
import {AuthService} from "../../providers/auth.service";

@NgModule({
  declarations: [
    PersonalQrCodePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalQrCodePage),
  ],
  providers:[
    AuthService,
  ]
})
export class PersonalQrCodePageModule {}
