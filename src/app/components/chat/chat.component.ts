import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  message: string;
  element: any;
  show: boolean = false;

  constructor(public cs: ChatService) {
    this.message = '';
    this.show = true;

    this.loadMessages();
  }

  sendMessage(): any {

    if ( this.message.length === 0 ) {
      return;
    }
    this.cs.sendMessage(this.message)
      .then( () => this.message = '' )
      .catch( (err) => console.error('Error al guardar', err));

  }

  loadMessages(): any {

    this.cs.loadMessages().subscribe( () => {
      this.element = document.getElementById('app-message');
      if ( this.show ) {
        setTimeout( () => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 50);
      }
    });

  }

  showChat(): void {
    this.show = !this.show;
    this.loadMessages();
  }

}
