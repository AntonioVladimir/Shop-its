import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  
  constructor(private firestore: AngularFirestore, public db: AngularFireDatabase , private router:Router) {}

  addItem(item: any, uid:string): Promise<any>{
    //return this.firestore.collection('item').add(item);
    const path = `items/${uid}/${item.name}`
    return this.db.object(path).set(item)
      .then(clase => {
        this.router.navigate([uid, '/shop-list']);
      })
      .catch(error => {
          console.log(error);
      });
  }

  getItems(uid:string): Observable<any>{
    //return this.firestore.collection('item', ref => ref.orderBy('creationDate','asc')).snapshotChanges();
    const path = `items/${uid}`
    //console.log(this.db.list(path).snapshotChanges())
    return this.db.list(path).snapshotChanges();
  }
  deleteItem(name: string, uid:string): Promise<any>{
    //return this.firestore.collection('item').doc(id).delete();
    const path = `items/${uid}/${name}`
    return this.db.object(path).remove();
  }

  getOneItem(name: string, uid: string):Observable<any>{
    const path = `items/${uid}/${name}`
    //return this.firestore.collection('item').doc(id).snapshotChanges();
    return this.db.list(path).snapshotChanges();
  }
  updateItem(item: any, uid: string):Promise<any>{
    const path = `items/${uid}/${item.name}`
    //return this.firestore.collection('item').doc(id).update(data);
    return this.db.object(path).update(item)
  }
}
