import { NotificacoesProvider } from './../../providers/notificacoes/notificacoes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private notificacoesProvider: NotificacoesProvider) {
  }

  login = {email: '', senha: ''};

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  fazerLogin() {
    this.notificacoesProvider.mostrarLoading();

    this.authProvider.login(this.login).then(res => {
      console.log('login efetuado c/ sucesso: ', res);
      
      this.notificacoesProvider.mostrarToast('Login realizado com sucesso!');
      this.notificacoesProvider.loading.dismiss();
    
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
