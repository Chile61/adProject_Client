import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {OrderService} from "../../providers/order.service";

/**
 * Generated class for the OrderDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetail implements OnInit{
  orderId:number;
  orderDetail:any = [];
  constructor(public navCtrl: NavController,
                public navParams: NavParams,
              private orderService:OrderService

  ) {
    this.orderId=navParams.get('orderId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetail');

  }

  ngOnInit(){
    let self = this;
    this.orderService.getList(1,null,this.orderId).then(function (result) {
      console.log('orderService.getOrderDetail',result);
      for (let i=0;i<result.length;i++){
        if (result[i].productImage.length>0){
          result[i].image= result[i].productImage[0].image;
        }else{
          result[i].image= ""
        }
      }
      self.orderDetail=result;
      console.log('orderService.getOrderDetail',self.orderDetail);
      //self.orderDetail.items = JSON.parse(result.items_json);
      //self.orderDetail.order.orderTime=new Date(self.orderDetail.order.create_time*1000).toLocaleString();
    })
  }

}
