import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app-interceptor';
import { AngularFireModule, } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAQmfwaK28DRZe1o4JCctNCVjgajv1IzDc',
  authDomain: 'system-management-demo.firebaseapp.com',
  databaseURL: 'https://system-management-demo.firebaseio.com',
  projectId: 'system-management-demo',
  storageBucket: 'system-management-demo.appspot.com',
  messagingSenderId: '525903303337'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
