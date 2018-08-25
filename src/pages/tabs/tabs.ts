import { Component } from '@angular/core';
import {GlobalService} from "../../providers/global.service";

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'ClassificationPage';
  tab3Root = 'DetectionPage';
  tab4Root = 'ShoppingCartPage';
  tab5Root = 'PersonalCenter';
  constructor(public globalService:GlobalService) {

  }
}
