import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show: boolean;

  constructor( public cs: ChatService ) { }

  ngOnInit(): void {
    this.show = false;
  }

  login( provider: string ): any {
    console.log(provider);
    this.cs.login(provider);
  }

  showChat(): void {
    this.show = !this.show;
  }

}
