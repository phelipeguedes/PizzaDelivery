import { FirebaseProvider } from './../../providers/firebase/firebase';
import { NotificacoesProvider } from './../../providers/notificacoes/notificacoes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private notificacoesProvider: NotificacoesProvider,
    private firebaseProvider:FirebaseProvider, private storage: Storage) {
  }

  login = {email: '', senha: ''};

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  fazerLogin() {
    this.notificacoesProvider.mostrarLoading();

    this.authProvider.login(this.login).then(res => {
      console.log('login efetuado c/ sucesso: ', res);

      // identificação do usuário(a)
      let userId = res.user.uid;

      this.firebaseProvider.getUsuario(userId).then((res) => {
          let data = res.data();
          
          this.storage.set('usuario', data).then(() => {
            this.notificacoesProvider.mostrarToast('Login realizado com sucesso!');
            this.notificacoesProvider.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
          });
      })
    
    }).catch(erro => {
      console.log('erro ao fazer login: ', erro);
      
      this.notificacoesProvider.mostrarAlerta('<p>Login inválido</p>', '<p class="alert-paragrafo">Nome de usuário(a)/senha incorretos.</p>');
      this.notificacoesProvider.loading.dismiss();      
    });
  }

  irParaRegistroPage() {
    this.navCtrl.push(RegistroPage);
  }

}
