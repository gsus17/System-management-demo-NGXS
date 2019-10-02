import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app-interceptor';
import { AngularFireModule, } from '@angular/fire';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AppI18nService } from './app-i18n.service';
import { AuthState } from './auth/login/store/auth.state';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AuthModule } from './auth/auth.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


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
    AppComponent,
    DialogDeleteComponent
  ],
  entryComponents: [DialogDeleteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxsModule.forRoot([AuthState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.credentials'
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AuthModule,
    NgxsFormPluginModule.forRoot()
  ],
  providers: [
    AppI18nService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
