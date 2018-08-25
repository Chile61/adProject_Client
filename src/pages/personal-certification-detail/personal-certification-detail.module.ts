import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalCertificationDetailPage } from './personal-certification-detail';
import {AuthService} from "../../providers/auth.service";
import {FilePath} from "@ionic-native/file-path";
import {FileChooser} from "@ionic-native/file-chooser";
import {ImagePicker} from "@ionic-native/image-picker";
import {Camera} from "@ionic-native/camera";
import {ShowMessageService} from "../../providers/show-message.service";
import {FileTransfer} from "@ionic-native/file-transfer";

@NgModule({
  declarations: [
    PersonalCertificationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalCertificationDetailPage),
  ],
  providers: [
    AuthService,
    ShowMessageService,
    FilePath,
    FileChooser,
    ImagePicker,
    Camera,
    FileTransfer
  ]
})
export class PersonalCertificationDetailPageModule {}
