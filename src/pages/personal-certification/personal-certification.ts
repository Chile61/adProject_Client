import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PersonalCertificationDetailPage} from "../personal-certification-detail/personal-certification-detail";
import {AuthService} from "../../providers/auth.service";

/**
 * Generated class for the PersonalCertificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-certification',
  templateUrl: 'personal-certification.html',
})
export class PersonalCertificationPage implements OnInit{
  userInfo:any;
  state:boolean = false;
  stateShow:string = "未完成认证";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService:AuthService,
  ) {
  }

  ngOnInit(){
    this.authService.getUserInfo().then((data)=>{
      console.log("PersonalCertificationPage",data.userInfo);
      this.userInfo=data.userInfo;
      if (data.userInfo.verification ==0){
        this.stateShow='未完成认证';
      }else if (data.userInfo.verification ==1) {
        this.stateShow = '正在认证中';
        this.state = true;
      }else if (data.userInfo.verification ==2) {
        this.stateShow = '已完成认证';
        this.state = true;
      }

      this.userInfo.state=this.state;
      this.userInfo.stateShow=this.stateShow;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalCertificationPage');
  }

  toCertificationDetail(){
    this.navCtrl.push('PersonalCertificationDetailPage',{"param":this.userInfo});
  }
}
