import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component'; // Root component
import { routes } from './app.routes'; // Your app's routes

@NgModule({
  declarations: [
    AppComponent, // Add any other components that aren’t part of feature modules
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Root-level Ionic setup
    RouterModule.forRoot(routes), // Set up the main router
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
