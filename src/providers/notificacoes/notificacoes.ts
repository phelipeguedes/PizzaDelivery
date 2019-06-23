
import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class NotificacoesProvider {

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    console.log('Hello NotificacoesProvider Provider');
  }

  loading: any;

  mostrarAlerta(titulo: string, subtitulo:string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: ['ok']
    });
    
    alert.present();
  }

  mostrarToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 5000,
      position: 'top'
    });

    toast.present();
  }

  mostrarLoading() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

}
