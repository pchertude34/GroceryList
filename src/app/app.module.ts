import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { FirebaseDataProvider } from '../providers/firebase-data/firebase-data';

import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyAyL7qj4Ucr5wE5eYkX-2SEjzN0J7bK6d0",
  authDomain: "grocerylist-349d0.firebaseapp.com",
  databaseURL: "https://grocerylist-349d0.firebaseio.com",
  projectId: "grocerylist-349d0",
  storageBucket: "grocerylist-349d0.appspot.com",
  messagingSenderId: "544516936540"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseDataProvider
  ]
})
export class AppModule {}
