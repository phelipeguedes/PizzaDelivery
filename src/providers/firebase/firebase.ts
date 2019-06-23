
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirebaseProvider {

  constructor(private angularFireStore: AngularFirestore) {
    console.log('Hello FirebaseProvider Provider');
  }

  novoUsuario = data => this.angularFireStore.collection('Users').doc(data.userId).set(data);


}
