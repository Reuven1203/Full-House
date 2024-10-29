import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {TabsComponent} from "../../tabs/tabs.component";
import {HomeComponent} from "../../tabs/home-page/home.component";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    IonicModule,
    TabsComponent
  ],
  standalone: true
})
export class MainLayoutComponent  {
  homeComponent = ()=> HomeComponent;
  constructor() { }



}
