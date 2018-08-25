import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {LoginService} from "../../providers/login.service";
import {HttpService} from "../../providers/httpService.service";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {AuthService} from "../../providers/auth.service";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  providers:[
    LoginService,
    HttpService,
    AuthService,
    BarcodeScanner,
    InAppBrowser
  ],
})
export class LoginPageModule {}
