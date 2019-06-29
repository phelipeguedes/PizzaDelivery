import { FirebaseProvider } from './../../providers/firebase/firebase';
import { firebaseConfig } from './../../configs/firebase';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  loading;  
  bebidas: any;
  hamburgueres: any;
  pizzas: any;
  sucos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseProvider: FirebaseProvider, private loadCtrl: LoadingController) {  
    
    this.loading = this.loadCtrl.create();
    this.loading.present();
  }

  // é carregada ao iniciar a página de menu
  ngOnInit() {

    this.loading.dismiss();

    // atribuição da listagem de hambúrgueres
    this.hamburgueres = this.firebaseProvider.getHamburgueres().valueChanges();
    
    // atribuição da listagem de bebidas
    this.bebidas = this.firebaseProvider.getBebidas().valueChanges();
    console.log(this.bebidas);

    // atribuição da listagem de pizzas
    this.pizzas = this.firebaseProvider.getPizzas().valueChanges();
  }

}
