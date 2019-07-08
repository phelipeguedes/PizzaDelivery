
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { map } from 'rxjs/operators';

/* Funções de acesso aos dados armezenados no firebase */

@Injectable()
export class FirebaseProvider {

  constructor(private fireStore: AngularFirestore, private angularFireDB: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }

  // cria um(a) novo(a) usuário(a) no firestore
  novoUsuario = data => this.fireStore.collection('users').doc(data.userId).set(data);

  // pega um(a) usuário(a) da coleção
  getUsuario(uid) {
    return this.fireStore.firestore.collection('users').doc(uid).get();
  }

  // retorna a lista de hamburgueres cadastrada no firebase
  getHamburgueres() {
    return this.fireStore.collection('Hamburgueres');
  }

  // pega um registro da coleção de hambúrgueres
  getDetalheHamburguer(id:string) {
    return this.fireStore.collection('Hamburgueres').doc(id).get();
  }

  // retorna a lista de bebidas cadastrada no firebase
  getBebidas() {
    return this.fireStore.collection('Bebidas');
  }

  getDetalheBebida(id:string) {
    return this.fireStore.collection('Bebidas').doc(id).get();
  }

  // retorna a lista de pizzas cadastradas no firebase
  getPizzas() {
    return this.fireStore.collection('Pizzas');
  }

   // pega um registro da coleção de pizzas
  getDetalhePizza(id:string) {
    return this.fireStore.collection('Pizzas').doc(id).get();
  }

}
