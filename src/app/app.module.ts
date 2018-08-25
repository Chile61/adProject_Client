import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPageModule} from "../pages/login/login.module";
import {HttpClientModule} from "@angular/common/http";
import {ShowMessageService} from "../providers/show-message.service";
import {Network} from "@ionic-native/network";
import {Device} from "@ionic-native/device";
import {TabsPage} from "../pages/tabs/tabs";
import {ShopService} from "../providers/shop.service";
import {GlobalService} from "../providers/global.service";
import {File} from "@ionic-native/file";
import {FileOpener} from "@ionic-native/file-opener";
import {FileTransfer} from "@ionic-native/file-transfer";
import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
  ],
  imports: [
    LoginPageModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Device,
    FileTransfer,File,FileOpener,AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShowMessageService,
    ShopService,
    GlobalService
  ]
})
export class AppModule {}
