import { MenuPage } from './../pages/menu/menu';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireDatabaseModule } from '@angular/fire/database';

//pages
import {CarrinhoPageModule} from '../pages/carrinho/carrinho.module';
import {MenuPageModule} from '../pages/menu/menu.module';
import {LoginPageModule} from '../pages/login/login.module';
import {RegistroPageModule} from '../pages/registro/registro.module';
import {DetalhesPageModule} from '../pages/detalhes/detalhes.module';

//firebase
import {firebaseConfig} from '../configs/firebase';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';

// providers
import { AuthProvider } from '../providers/auth/auth';
import { NotificacoesProvider } from '../providers/notificacoes/notificacoes';
import { FirebaseProvider } from '../providers/firebase/firebase';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),    
    //pages
    CarrinhoPageModule,
    MenuPageModule,
    LoginPageModule,
    DetalhesPageModule,
    RegistroPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    NotificacoesProvider,
    FirebaseProvider, 
    Storage
  ]
})
export class AppModule {}
