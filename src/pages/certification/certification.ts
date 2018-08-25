import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth.service";

/**
 * Generated class for the CertificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-certification',
  templateUrl: 'certification.html',
})
export class CertificationPage {
  certficationTypeInfo = [
    {
      'id':123,
      'typeId':1,
      'typeName':'个人认证',
      'complete':false,
      'completeShow':'已完成认证',
      'page':'PersonalCertificationPage'
    }
    // ,
    // {
    //   'id':1231,
    //   'typeId':2,
    //   'typeName':'员工认证',
    //   'complete':false,
    //   'completeShow':'未完成认证',
    //   'page':'EmployeeCertificationPage'
    // },
    // {
    //   'id':322,
    //   'typeId':3,
    //   'typeName':'企业认证',
    //   'complete':false,
    //   'completeShow':'未完成认证',
    //   'page':'CompanyCertificationPage'
    // }
  ];

  constructor(public navCtrl: NavController,
              private authService:AuthService,
              public navParams: NavParams) {
    this.checkInfo();
  }

  checkInfo(){
    // for (let i=0; i<this.certficationTypeInfo.length;i++){
    //   if (this.certficationTypeInfo[i].complete){
    //     this.certficationTypeInfo[i].completeShow='已完成认证';
    //   }else{
    //     this.certficationTypeInfo[i].completeShow='未完成认证';
    //   }
    //   switch (this.certficationTypeInfo[i].typeId){
    //     case 1:
    //       this.certficationTypeInfo[i].typeName='个人认证';
    //   }
    // }
    this.authService.getUserInfo().then((data)=>{
      console.log("PersonalCertificationPage",data.userInfo);

      if (data.userInfo.verification ==0){
        this.certficationTypeInfo[0].completeShow='未完成认证';
        //this.certficationTypeInfo[0].complete=true;
      }else if (data.userInfo.verification ==1) {
          this.certficationTypeInfo[0].completeShow = '正在认证中';
      }else if (data.userInfo.verification ==2) {
        this.certficationTypeInfo[0].completeShow = '已完成认证';
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CertificationPage');
  }

  toCertification(item){
    console.log('toCertification');
    if (!item.complete){
      this.navCtrl.push(item.page);
    }
  }
}
