import { Lanche } from './../../models/Lanche';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesPage {

  lanche: Lanche;
  pizza: Lanche;
  hamburguer: Lanche;  
  bebida: Lanche;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
    
    this.lanche = new Lanche();

    this.lanche.tipo = this.navParams.get('tipo');
    this.lanche.id = this.navParams.get('id');
    console.log('id: ', this.lanche.id, 'tipo: ', this.lanche.tipo);
    
    switch (this.lanche.tipo) {
      case 'hamburguer':
        this.hamburguerDetalhes(this.lanche.id);
        break;
      case 'pizza':
        this.pizzaDetalhes(this.lanche.id);
        break;
      case 'bebida':
        this.bebidaDetalhes(this.lanche.id);
        break;
      default:
        break;
    }   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesPage');
  }

  hamburguerDetalhes(id: string) {
    this.firebaseProvider.getDetalheHamburguer(id).toPromise().then(doc => {
          
      console.log('documento: ', doc.data()); 
      this.hamburguer = new Lanche();               
          
      this.hamburguer.id = doc.data().id;
      this.hamburguer.nome = doc.data().nome;
      this.hamburguer.descricao = doc.data().descricao;
      this.hamburguer.foto = doc.data().foto;
      this.hamburguer.preco = doc.data().preco;
          
      console.log('documento: ', this.hamburguer.nome, this.hamburguer.preco, this.hamburguer.descricao);                

    }).catch(erro => {
      console.log("Erro ao pegar o documento:", erro);
    }); 
  }

  pizzaDetalhes(id:string) {
    this.firebaseProvider.getDetalhePizza(id).toPromise().then(doc => {
        console.log('documento: ', doc.data());
        this.pizza = new Lanche();
        
        this.pizza.id = doc.data().id;
        this.pizza.nome = doc.data().nome;
        this.pizza.descricao = doc.data().descricao;
        this.pizza.foto = doc.data().foto;
        this.pizza.preco = doc.data().preco;

    }).catch(erro => {
      console.log("Erro ao pegar o documento:", erro);
    });
  }

  bebidaDetalhes(id:string) {
    this.firebaseProvider.getDetalheBebida(id).toPromise().then(doc => {
      console.log('documento: ', doc.data());
      this.bebida = new Lanche();

      this.bebida.id = doc.data().id;
      this.bebida.nome = doc.data().nome;
      this.bebida.descricao = doc.data().descricao;
      this.bebida.foto = doc.data().foto;
      this.bebida.preco = doc.data().preco;
      
    }).catch(erro => {
      console.log("Erro ao pegar o documento:", erro);
    });
  }

}
