import { NgModule } from '@angular/core';
import {AlertController, IonicPageModule, Platform} from 'ionic-angular';
import { HomePage } from './home';
import {HomeInfoModule} from "../../components/home-info/home-info.module";
import {AdService} from "../../providers/ad.service";
import {ApplicationUpdateService} from "../../providers/application-update.service";
import {AppVersion} from "@ionic-native/app-version";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    HomeInfoModule,
    IonicPageModule.forChild(HomePage),
  ],
  providers:[
    AdService,
    ApplicationUpdateService,
    AppVersion,
    AlertController,
    Platform,
  ]
})
export class HomePageModule {}
