import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonTab } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  triangle,
  ellipse,
  square,
  home,
  homeOutline,
  triangleOutline,
  ellipseOutline,
  squareOutline,
  heart,
  heartOutline
} from 'ionicons/icons';
import { filter } from 'rxjs/operators';
import { tabMetadata } from './tabs-metadata';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonTab],
})
export class TabsComponent implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);

  private router = this.environmentInjector.get(Router);
  private activatedRoute = this.environmentInjector.get(ActivatedRoute);

  tabs = tabMetadata;
  activePath: string = ''; // Store the active path here

  constructor() {
    // Register icons for use in ion-icon
    addIcons({
      triangle,
      triangleOutline,
      ellipse,
      ellipseOutline,
      square,
      squareOutline,
      home,
      homeOutline,
      heartOutline,
      heart
    });
  }

  ngOnInit() {
    // Listen to router events to detect the active path
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.activePath = event.urlAfterRedirects;
      });
  }

  // Function to get icon based on active state
  getIcon(tab: any): string {
    return this.activePath.includes(tab.path) ? tab.activeIcon : tab.icon;
  }
}
