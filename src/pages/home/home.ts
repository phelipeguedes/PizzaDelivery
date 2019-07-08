import { MenuPage } from './../menu/menu';
import { LoginPage } from './../login/login';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CarrinhoPage } from '../carrinho/carrinho';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private rootPage: any = HomePage;
  hamburgueres: any = [];

  constructor(public navCtrl: NavController, private firebaseProvider: FirebaseProvider, private menuCtrl: MenuController) {

  }

  ngOnInit() {
    this.hamburgueres = this.firebaseProvider.getHamburgueres().valueChanges();
    console.log(this.hamburgueres);
  }

  addItem() {
    this.navCtrl.push(CarrinhoPage);
  }

  irParaHomePage() {
    this.navCtrl.pop();
  }

  irParaMenuPage() {
    this.navCtrl.push(MenuPage);
  }

  irParaCarrinhoPage() {
    this.navCtrl.push(CarrinhoPage);
  }

  fecharMenu() {
    this.menuCtrl.close();
  }

  fazerLogout() {
    this.navCtrl.setRoot(LoginPage);
  }

}
