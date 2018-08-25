import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormControl} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {AuthService} from "../../providers/auth.service";
import {ShowMessageService} from "../../providers/show-message.service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  info:any ={
    "account":'',
    "password":'',
    "phone":'',
    "superior":'gsgzh',
  };

  confirmPassword:string='';

  qrData:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService:AuthService,
              private showMessageService:ShowMessageService,
              ) {
    let data=navParams.get('data');
    if (data!=null && data!=""){
      this.info.superior="gsgzh";
    }else{
      this.qrData = JSON.parse(navParams.get('qrData'));
      console.log('Register qrData:',this.qrData);
      this.info.superior=this.qrData.data.account;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    this.authService.registerUser(this.info).then((result) => {
        console.log(result);
        this.showMessageService.alert('注册成功!');
        this.navCtrl.pop();
      });
  }


}
