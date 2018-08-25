import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalCenter } from './personal-center';
import {FileTransfer,FileTransferObject} from "@ionic-native/file-transfer";
import { File } from '@ionic-native/file';
import {FileOpener} from "@ionic-native/file-opener";
import {AppVersion} from "@ionic-native/app-version";
import {AuthService} from "../../providers/auth.service";
import {PointsService} from "../../providers/points.service";
import {AdService} from "../../providers/ad.service";

@NgModule({
  declarations: [
    PersonalCenter,
  ],
  imports: [
    IonicPageModule.forChild(PersonalCenter),
  ],
  providers:[
    FileTransfer,
    FileTransferObject,
    File,
    FileOpener,
    AppVersion,
    AuthService,
    PointsService,
    AdService,
  ],
})
export class PersonalCenterModule {}
