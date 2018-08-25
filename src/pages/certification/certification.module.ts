import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CertificationPage } from './certification';
import {AuthService} from "../../providers/auth.service";

@NgModule({
  declarations: [
    CertificationPage,
  ],
  imports: [
    IonicPageModule.forChild(CertificationPage),
  ],
  providers:[
    AuthService
  ],

})
export class CertificationPageModule {}
