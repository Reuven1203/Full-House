import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IonApp, IonContent, IonNav, IonRouterOutlet, IonToggle} from '@ionic/angular/standalone';
import {TabsComponent} from "./tabs/tabs.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {ComponentPreloadService} from "./core/services/component-preload.service";
import {DatabaseService} from "../database/database.service";
import {SplashScreen} from "@capacitor/splash-screen";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, TabsComponent, MainLayoutComponent, IonNav, IonToggle, IonContent, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class AppComponent {
  constructor(private database: DatabaseService) {
    this.initApp().then(r => {
      console.log('>>>> App initialized')
    })
  }

  async initApp() {
    await SplashScreen.show({
      autoHide: true
    });
    try {
      await this.database.initializePlugin();
      console.log('>>>> Database initialized')
    }catch(error){
      console.error("Failed to initialize app:", error);
    }
  }
}
