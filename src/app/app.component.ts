import {Component} from '@angular/core';
import {IonApp, IonContent, IonNav, IonRouterOutlet, IonToggle} from '@ionic/angular/standalone';
import {TabsComponent} from "./tabs/tabs.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {ComponentPreloadService} from "./core/services/component-preload.service";
import {DatabaseService} from "../database/database.service";
import {SplashScreen} from "@capacitor/splash-screen";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, TabsComponent, MainLayoutComponent, IonNav, IonToggle, IonContent],
})

export class AppComponent {
  constructor(private database:DatabaseService) {
    this.initApp()
  }

  async initApp() {
    const database = await this.database.initializePlugin()
    console.log('Database initialized:', database)
    await SplashScreen.hide();
  }
}
