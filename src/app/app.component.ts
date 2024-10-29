import { Component } from '@angular/core';
import {IonApp, IonContent, IonNav, IonRouterOutlet, IonToggle} from '@ionic/angular/standalone';
import {TabsComponent} from "./tabs/tabs.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {ComponentPreloadService} from "./core/services/component-preload.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, TabsComponent, MainLayoutComponent, IonNav, IonToggle, IonContent],
})
export class AppComponent {

}
