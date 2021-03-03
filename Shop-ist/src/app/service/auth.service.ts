import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@firebase/auth-types';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User;

  constructor(public afAuth: AngularFireAuth) {}

  async loginGoogle(){
    try {
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    } catch (error) {
      console.log(error);
      
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
//
