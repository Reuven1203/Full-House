import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentPreloadService {
  constructor(private platform: Platform) {}

  initializeComponents() {
    this.platform.ready().then(() => {
      // Preload ion-toggle and other components programmatically
      this.createAndRemoveElement('ion-toggle');
      this.createAndRemoveElement('ion-segment');
      this.createAndRemoveElement('ion-segment-button');
    });
  }

  private createAndRemoveElement(tagName: string) {
    const element = document.createElement(tagName);
    document.body.appendChild(element); // Temporarily add to DOM to load
    document.body.removeChild(element); // Immediately remove it
  }
}
