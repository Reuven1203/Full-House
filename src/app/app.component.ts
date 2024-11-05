import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import {IonApp, IonContent, IonNav, IonRouterOutlet, IonToggle} from '@ionic/angular/standalone';
import {TabsComponent} from "./tabs/tabs.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {ComponentPreloadService} from "./core/services/component-preload.service";
import {DatabaseService} from "../database/database.service";
import {SplashScreen} from "@capacitor/splash-screen";
import {NgIf} from "@angular/common";
import {App} from "@capacitor/app";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, TabsComponent, MainLayoutComponent, IonNav, IonToggle, IonContent, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class AppComponent implements OnInit {
  private database = inject(DatabaseService);
  async ngOnInit() {
    await SplashScreen.show(
      {
        autoHide: false
      }
    );
    await this.initApp();
    await SplashScreen.hide();
    await App.addListener('appStateChange', async (state) => {
      if (state.isActive) {
        try {
          await this.database.establishConnection();
          console.log("Database connection re-established on app resume");
        } catch (error) {
          console.error("Error re-establishing database connection on app resume:", error);
        }
      }
    });
  }

  async initApp() {
    try {
      await this.database.initializePlugin();
      console.log('>>>> Database initialized')
    }catch(error){
      console.error("Failed to initialize app:", error);
    }
  }

}
