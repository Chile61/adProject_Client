import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalFansPage } from './personal-fans';
import {FansListModule} from "../../components/fans-list/fans-list.module";
import {AuthService} from "../../providers/auth.service";

@NgModule({
  declarations: [
    PersonalFansPage,
  ],
  imports: [
    FansListModule,
    IonicPageModule.forChild(PersonalFansPage),
  ],
  providers: [
    AuthService,
  ]
})
export class PersonalFansPageModule {}
