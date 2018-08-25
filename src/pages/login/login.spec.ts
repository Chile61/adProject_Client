import {async, inject, TestBed, tick} from '@angular/core/testing';
import {IonicModule,NavController, NavParams, ToastController, AlertController} from "ionic-angular";
import {LoginPage} from "./login";
import {NavMock, NavParamsMock} from "../../../test-config/mocks-ionic";
import {LoginService} from "../../providers/login.service";
import {StorageProvider} from "../../providers/storage-provider";
import {Device} from "@ionic-native/device";
import {AndroidFingerprintAuth} from "@ionic-native/android-fingerprint-auth";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {MyApp} from "../../app/app.component";

export class MockLoginService extends LoginService{

  constructor() {
    super(null);
  }

  getLoginList(userName,userPassword,deptId,deptName): Promise<any> {
    console.log('哈哈1');
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve({
          "result": "true",
          "content": "登陆成功！",
          "userinfo": {
            "auther": "",
            "caflag": "0",
            "deptLevel": "",
            "deptid": "",
            "id": "",
            "isleader": "0",
            "method": "",
            "note": "",
            "phone": "18078331226",
            "status": "1",
            "time": "2015_01_10_16_58_07",
            "type": "",
            "userCode": "",
            "userNm": "李航",
            "userOnline": "",
            "userPassword": "7fa8282ad93047a4d6fe6111c93b308a",
            "userPassword2": "",
            "userSex": "男",
            "userStatus": "1",
            "userTitle": "",
            "useremail": "@gxnx.com",
            "useremailpsw": "",
            "userid": "8a8f9e8846fe46900146fe4a6f090005",
            "username": "lihang",
            "usernamefull": "李航"
          },
          "userDeptId": "001011011",
          "userDeptName": "桂林市人民政府/桂林市人民政府办公室/信息科",
          "haveMoreRole": "false",
          "mySessionId": "df22f788-e701-49ee-9f3a-a9000cc4f257"
        });
      },1000);
    });
  }

  getFingerprintInfo(info,loginType) {
    console.log('哈哈2');
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve({
          "result": "true",
          "content": "登陆成功！",
          "userinfo": {
            "auther": "",
            "caflag": "0",
            "deptLevel": "",
            "deptid": "",
            "id": "",
            "isleader": "0",
            "method": "",
            "note": "",
            "phone": "18078331226",
            "status": "1",
            "time": "2015_01_10_16_58_07",
            "type": "",
            "userCode": "",
            "userNm": "李航",
            "userOnline": "",
            "userPassword": "7fa8282ad93047a4d6fe6111c93b308a",
            "userPassword2": "",
            "userSex": "男",
            "userStatus": "1",
            "userTitle": "",
            "useremail": "@gxnx.com",
            "useremailpsw": "",
            "userid": "8a8f9e8846fe46900146fe4a6f090005",
            "username": "lihang",
            "usernamefull": "李航"
          },
          "userDeptId": "001011011",
          "userDeptName": "桂林市人民政府/桂林市人民政府办公室/信息科",
          "haveMoreRole": "false",
          "mySessionId": "df22f788-e701-49ee-9f3a-a9000cc4f257"
        });
      },1000);
    });
  }
}

describe('Component: LoginPage(登录页面)', () => {
  let fixture;
  let context;
  let spy: jasmine.Spy;
  let userName='lihang';
  let userPassword='1';
  let userDeptId='001011011';
  let userDeptName='桂林市人民政府/桂林市人民政府办公室/信息科';
  let el;
  let de;
  let loginService : LoginService;

  let onePersonPostData ={
    "result": "true",
    "content": "登陆成功！",
    "userinfo": {
      "auther": "",
      "caflag": "0",
      "deptLevel": "",
      "deptid": "",
      "id": "",
      "isleader": "0",
      "method": "",
      "note": "",
      "phone": "18078331226",
      "status": "1",
      "time": "2015_01_10_16_58_07",
      "type": "",
      "userCode": "",
      "userNm": "李航",
      "userOnline": "",
      "userPassword": "7fa8282ad93047a4d6fe6111c93b308a",
      "userPassword2": "",
      "userSex": "男",
      "userStatus": "1",
      "userTitle": "",
      "useremail": "@gxnx.com",
      "useremailpsw": "",
      "userid": "8a8f9e8846fe46900146fe4a6f090005",
      "username": "lihang",
      "usernamefull": "李航"
    },
    "userDeptId": "001011011",
    "userDeptName": "桂林市人民政府/桂林市人民政府办公室/信息科",
    "haveMoreRole": "false",
    "mySessionId": "df22f788-e701-49ee-9f3a-a9000cc4f257"
  };

  let deptData = {
    "result": "selectDept",
    "content": "请选择部门角色！",
    "selectDeptMap": [
      {
        "depart_name": "桂林市人民政府/桂林市人民政府办公室/文书科",
        "depart_code": "001011010"
      },
      {
        "depart_name": "桂林市人民政府/桂林市人民政府办公室/信息科",
        "depart_code": "001011011"
      }
    ]
  }

  function createComponent() {
    fixture = TestBed.createComponent(LoginPage);
    context = fixture.componentInstance;
    // el = fixture.nativeElement;
    // de = fixture.debugElement;

    context.userName=userName;
    context.userPassword=userPassword;
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:[
        StorageProvider,
        Device,
        AndroidFingerprintAuth,
        { provide: NavController, useClass: NavMock},
        { provide: NavParams, useClass: NavParamsMock},
        { provide: LoginService, useClass: MockLoginService},
      ],
      // providers: [LoginPage]
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      declarations: [MyApp,LoginPage]
    }).compileComponents()
      .then(()=>{
        createComponent();
      });

  }));


  describe('页面及功能', () => {
    it('创建登录页面实例', () => {
      // expect(component instanceof LoginPage).toBe(true);
      expect(context).toBeTruthy();
    });

    it('面页渲染', () => {
      el = fixture.nativeElement;
      expect(el.querySelector('h1').innerText).toBe('桂林市协同办公统一平台');
      // expect(context['title']).toEqual('Login Page');
    });

    it('登录输入', () => {
      fixture.detectChanges();
      //expect(context['userName']).toEqual(userName);
      // de = fixture.debugElement.query(By.css('#name'));
      de = fixture.debugElement.query(By.css('#name'));
      //console.log('a',de);
      el = de.nativeElement;
      //console.log('b',el);
      expect(el.getAttribute("ng-reflect-model")).toEqual(userName);
      de = fixture.debugElement.query(By.css('#password'));
      el = de.nativeElement;
      expect(el.getAttribute("ng-reflect-model")).toEqual(userPassword);
    });

    // it('登录输入', () => {
    //   expect(el.querySelector('#name').value).toBe(userName);
    //   expect(el.querySelector('#password').value).toBe(userPassword);
    // });

    it('函数定义（登录）', function() {
      expect(context.login).toBeDefined();
    });

    it('登录事件（onSubmit）', () => {


      // let loginBtn: DebugElement = fixture.debugElement.query(By.css('#sampleBtn'));
      // de = fixture.debugElement.query(By.css('#login'));
      // el = de.nativeElement;
      // console.log(el);
      //el.querySelector('button').click();
      // loginBtn.nativeElement.click();
      spyOn(context, 'login');
      let form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      fixture.detectChanges();
      expect(context.login).toHaveBeenCalled();
    });

    it('函数测试（一人一岗登录）', async(() => {
      context.getLoginInfo(userName,userPassword,'','');
      fixture.detectChanges();
      setTimeout(()=>{
        expect(context.testInfo).toEqual('true');
      },1500);
      // expect(true).toBe(true);
    }));

    it('函数测试（一人多岗登录）', async(() => {
      context.getLoginInfo(userName,userPassword,userDeptId,userDeptName);
      fixture.detectChanges();
      setTimeout(()=>{
        expect(context.testInfo).toEqual('true');
      },1500);
    }));

  });

  describe('服务调用', () => {
    it('登录服务 (done)', (done: DoneFn) => {
      let loginService = TestBed.get(LoginService);

      spy = spyOn(loginService, 'getLoginList').and.returnValues(Promise.resolve(onePersonPostData));
      let form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      fixture.detectChanges();

      console.log('spy.calls.mostRecent()',spy.calls.mostRecent());

      spy.calls.mostRecent().returnValue.then(res => {
        fixture.detectChanges();
        expect(true).toBe(true);
        done();
      });
    });
  });
  // it('用户密码登陆',async(inject([LoginService],(service)=>{
  //   service.getLoginList()
  // })
  // it('登录服务', () => {
  //   // expect(spy.calls.any()).toBe(true, 'get called');
  //   expect(spy.calls.any()).toBe(true, 'get called');
  // });

  // it('should be component initialized (done)', (done: DoneFn) => {
  //   fixture.detectChanges();
  //   spy.calls.mostRecent().returnValue.then(res => {
  //     fixture.detectChanges();
  //     expect(true).toBe(true);
  //     done();
  //   });
  // });

  // it('should be component initialized', () => {
  //   context.userName = userName;
  //   context.userPassword = userPassword;
  //   fixture.detectChanges();
  //   expect(spy.calls.any()).toBe(true, 'get called');
  // });
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LoginPage);
  //   component = fixture.componentInstance;
  //   el = fixture.nativeElement;
  //   de = fixture.debugElement;
  //   // spyOn(component, 'onSubmit');
  //   fixture.detectChanges();
  // });
  // //
  // it('创建登陆页面实例', () => {
  //   // expect(component instanceof LoginPage).toBe(true);
  //   expect(component).toBeTruthy();
  // });
  //
  // it('should be component initialized (done)', (done: DoneFn) => {
  //   component.id = 1;
  //   fixture.detectChanges();
  //   expect(spy.calls.any()).toBe(true, 'get called');
  //   spy.calls.mostRecent().returnValue.then(res => {
  //     fixture.detectChanges();
  //     expect(component.userName).toBe(userName);
  //     expect(component.userPassword).toBe(userPassword);
  //     // expect(el.querySelector('dl')).not.toBeNull();
  //     // expect(el.querySelector('.sku-id').textContent).toBe('' + testTrade.sku_id);
  //     // expect(el.querySelector('.ware-title').textContent).toBe(testTrade.title);
  //     done();
  //   });
  // });

  // it('跳转登录', async(() => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   component.userName='lihang';
  //   component.userPassword='1';
  //   fixture.detectChanges();
  //   let tmpStr=compiled.querySelector('button').textContent;
  //   compiled.querySelector('button').click();
  //   expect(component.onSubmit).toHaveBeenCalled();
  //   //expect(compiled.querySelector('h1').textContent).toContain('test 1');
  // }));

  // it('测试组件',inject([LoginPage],(component)=>{
  //   component.
  // }));

  // it('测试一下', () => {
  //   let a = true
  //   expect(a).toBe(true);
  // });

});
