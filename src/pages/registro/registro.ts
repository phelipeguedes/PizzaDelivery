import { FirebaseProvider } from './../../providers/firebase/firebase';
import { NotificacoesProvider } from './../../providers/notificacoes/notificacoes';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Keyboard } from '@ionic-native/keyboard';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  form: FormGroup;
  
  registro = {nome: '', email: '', senha: ''};  

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private loadCtrl: LoadingController,
     private notificacoesProvider: NotificacoesProvider, private firebaseProvider: FirebaseProvider, private formBuilder: FormBuilder) {

      /* validação do formulário */
      this.form = this.formBuilder.group({        
        nome:[this.registro.nome, Validators.required],
        email:[this.registro.email, Validators.compose([
          Validators.required, 
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        senha:[this.registro.senha, Validators.required],        
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  criarNovoUsuario() {
    this.notificacoesProvider.mostrarLoading();

    this.authProvider.registro(this.registro).then(res => {
      console.log('novo(a) usuário(a) criado(a) com sucesso!', res);
      
      this.notificacoesProvider.mostrarToast('Usuário(a) criado(a) com sucesso!');
      this.notificacoesProvider.loading.dismiss();

      let userId = res.user.uid;
      let usuario = {userId:userId, nome: this.registro.nome, email: this.registro.email};
      
      this.firebaseProvider.novoUsuario(usuario).then(res => {
        console.log('sucesso!');
      }).catch(erro => {
        console.log('erro: ', erro);
      });

    }).catch(erro => {
      console.log(erro);
      
      switch (erro.code) {
        case 'auth/invalid-email':
          this.notificacoesProvider.mostrarAlerta('<p>Email inválido</p>', '<p class="alert-paragrafo">Informe um email com o formato válido.</p>');
        break;
        case 'auth/weak-password':
          this.notificacoesProvider.mostrarAlerta('<p>Senha inválida</p>', '<p class="alert-paragrafo">A senha deve ter no mínimo 6 caracteres.</p>');
        break;
        case 'auth/email-already-in-use':
          this.notificacoesProvider.mostrarAlerta('<p>Email Já Existente</p>', '<p class="alert-paragrafo">Este email já é utilizado por uma outra conta.</p>');
        break;
        default:
            this.notificacoesProvider.mostrarAlerta('<p>Dado(s) Inválido(s)</p>','<p class="alert-paragrafo">Por favor, verifique se os dados foram digitados corretamente.</p>');
        break;
      }

      this.notificacoesProvider.loading.dismiss();
    });
  }

  irParaLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }

}
