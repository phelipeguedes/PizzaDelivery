import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class AuthProvider {

  constructor(private angularAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  // criar novo usuário(a)
  registro = (data) => this.angularAuth.auth.createUserWithEmailAndPassword(data.email, data.senha);

  // login usuário(a) existente
  login = (data) => this.angularAuth.auth.signInWithEmailAndPassword(data.email, data.senha);

}
