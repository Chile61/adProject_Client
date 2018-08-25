import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalCertificationPage } from './personal-certification';
import {AuthService} from "../../providers/auth.service";

@NgModule({
  declarations: [
    PersonalCertificationPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalCertificationPage),
  ],
  providers:[
    AuthService
  ],
})
export class PersonalCertificationPageModule {}
