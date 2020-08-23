import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Message } from '../Interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];
  public user: any = {};

  constructor( private afs: AngularFirestore,
               public auth: AngularFireAuth ) {

    this.auth.authState.subscribe( resp => {
      console.log('Estatus user: ', resp);
      if ( !resp ) {
        return;
      }
      this.user.name = resp.displayName;
      this.user.uid  = resp.uid;
      this.user.email = resp.email;
      this.user.photoURL = resp.photoURL;
    });
   }

  login( provider: string ): any {

    if ( provider === 'google' ) {
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
      console.log('===== login Google ======');
      console.log('User: ' + this.user );
    } else if ( provider === 'twitter' ) {
      this.auth.signInWithPopup(new auth.TwitterAuthProvider());
      console.log('===== login Twitter ======');
      console.log('User: ' + this.user )
    }
  }

  logout(): any {

    this.user = {}
    this.auth.signOut();
    console.log('===== signOut ======');
    console.log('User: ' + this.user );
  }

  loadMessages(): any {

    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(10));
    return this.itemsCollection.valueChanges().pipe(
      map((messages: Message []) => {
        console.log(messages[0]);
        this.chats = [];

        for(const message of messages ) {
          this.chats.unshift(message);
        }

        return this.chats;
      })
    );

   }

  sendMessage(value: string ): any {

    const message: Message = {
        name: this.user.name,
        message: value,
        date: new Date().getTime(),
        uid: this.user.uid,
        email: this.user.email,
        photoURL: this.user.photoURL
    };

    return this.itemsCollection.add(message);
   }

}
