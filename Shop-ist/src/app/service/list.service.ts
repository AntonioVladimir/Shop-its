import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  
  constructor(private firestore: AngularFirestore) {

    
  }
  addItem(item: any): Promise<any>{
    return this.firestore.collection('item').add(item);
  }
  getItems(uid:string): Observable<any>{
    return this.firestore.collection('item', ref => ref.orderBy('creationDate','asc')).snapshotChanges();
  }
  deleteItem(id: string): Promise<any>{
    return this.firestore.collection('item').doc(id).delete();
  }

  getOneItem(id: string):Observable<any>{
    return this.firestore.collection('item').doc(id).snapshotChanges();
  }
  updateItem(id: string, data: any):Promise<any>{
    return this.firestore.collection('item').doc(id).update(data);
  }
}
