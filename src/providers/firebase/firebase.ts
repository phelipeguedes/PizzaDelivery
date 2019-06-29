
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirebaseProvider {

  private pathHamburgueres = 'Hamburgueres/';

  constructor(private fireStore: AngularFirestore) {
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

  // retorna a lista de bebidas cadastrada no firebase
  getBebidas() {
    return this.fireStore.collection('Bebidas');
  }

  // retorna a lista de pizzas cadastradas no firebase
  getPizzas() {
    return this.fireStore.collection('Pizzas');
  }

}
