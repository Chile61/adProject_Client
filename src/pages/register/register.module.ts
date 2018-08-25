import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import {CustomFormsModule} from 'ng2-validation';
import {AuthService} from "../../providers/auth.service";
@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    CustomFormsModule,
    IonicPageModule.forChild(RegisterPage),
  ],
  providers: [
    AuthService,
  ]
})
export class RegisterPageModule {}
