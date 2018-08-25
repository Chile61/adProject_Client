import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth.service";
import {FilePath} from "@ionic-native/file-path";
import {FileChooser} from "@ionic-native/file-chooser";
import {ImagePicker} from "@ionic-native/image-picker";
import {Camera} from "@ionic-native/camera";
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";
import {ShowMessageService} from "../../providers/show-message.service";
import {BaseUrl} from "../../common/commonSet"
import {HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../providers/storage.service";
/**
 * Generated class for the PersonalCertificationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-certification-detail',
  templateUrl: 'personal-certification-detail.html',
})
export class PersonalCertificationDetailPage {
  // certificationProgress={
  //   'state':0,
  //   'stateShow':'未提交认证',
  //   'account':'abc123',
  //   'userName':'',
  //   'mobile':'13800138000',
  //   'typeOfCertificate':'身份证',
  //   'certificateNum':'45454563131313132132134',
  //   'address':'广西柳州',
  //   'positive':'',
  //   'opposite':'',
  //   'handheld':''
  // };
  // 调用相机时传入的参数

  imgName = "";
  imgPath = "";

  private cameraOpt = {
    quality: 50,
    destinationType: 1, // Camera.DestinationType.FILE_URI,
    sourceType: 1, // Camera.PictureSourceType.CAMERA,
    encodingType: 0, // Camera.EncodingType.JPEG,
    mediaType: 0, // Camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true
  };
  // 调用相册时传入的参数
  private imagePickerOpt = {
    maximumImagesCount: 1,//选择5张图片
    width: 800,
    height: 800,
    quality: 80
  };

  imgUpload: any = 'assets/imgs/upload.png';
  userInfo: any;

  constructor(public navCtrl: NavController,
              private authService: AuthService,
              private actionSheetCtrl: ActionSheetController,
              private fileChooser: FileChooser,
              private filePath: FilePath,
              private imagePicker: ImagePicker,
              private camera: Camera,
              private showMessageService: ShowMessageService,
              private transfer: FileTransfer,
              public navParams: NavParams) {
    this.userInfo = navParams.get('param');
    console.log("userInfo!!!!!!!!", this.userInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalCertificationDetailPage');
  }

  openFileType() {
    this.useASComponent();
  }

  // 使用ionic中的ActionSheet组件
  private useASComponent() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.startCamera();
          }
        }
        ,
        // {
        //   text: '从手机相册选择图片',
        //   handler: () => {
        //     this.openImgPicker();
        //   }
        // },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  // 启动拍照功能
  private startCamera() {
    let self = this;
    self.camera.getPicture(this.cameraOpt).then((imageData) => {
      self.imgName = "image";
      self.imgPath = imageData;
    }, (err) => {
      this.showMessageService.showToast('ERROR:' + err); //错误：无法使用拍照功能！
    });
  }

  // 打开手机相册
  private openImgPicker() {
    let self = this;
    self.imagePicker.getPictures(this.imagePickerOpt)
      .then((results) => {
        console.log("getPictures results--", results);
        if (results == "OK") {
          return;
        }
        for (let i = 0; i < results.length; i++) {
          self.imgName = "image";
          self.imgPath = results[i];
        }
      }, (err) => {
        this.showMessageService.showToast('ERROR:' + err); //错误：无法从手机相册中选择图片！
      });
  }

  saveDetail() {
    let params = {
      "name":this.userInfo.name,
      "birthday":this.userInfo.birthday,
      "cardType":this.userInfo.cardType,
      "cardID":this.userInfo.cardID
    };
    let token = 'Bearer ' + StorageService.read('token');
    let option: FileUploadOptions = {
      fileKey: 'file',
      mimeType: 'image/jpeg',
      httpMethod: 'POST',
      headers: {
        'Authorization': token
      },
      fileName: this.imgName,
      params: params
    };

    const fileTransfer: FileTransferObject = this.transfer.create();
    console.log('filename = ' + this.imgPath);
    fileTransfer.upload(this.imgPath, encodeURI(BaseUrl+'user/uploadCert'), option).then((result) => {
      console.log("result = ", result);
      console.log('success');
      this.navCtrl.popAll();
    }).catch(error => {
      // this.loader.dismiss();
      console.log('upload error');
      console.log(error);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
    });
  }

}



