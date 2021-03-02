import { Component, HostListener, OnInit } from '@angular/core';
import { IMail } from '../interfaces/imail';
import { CurrentUserService } from '../services/current-user.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-no',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css'],
})
export class MailboxComponent implements OnInit {
  pageHeight: number = window.innerHeight;
  emails: IMail[] = [];

  constructor(private auth: CurrentUserService,
    private socket: WebsocketService) { }

  ngOnInit(): void {
    let email1: IMail = { 
      EMAIL: [
        "09283",
        "testest", 
        "ttttttt", 
        "Hi!", 
        "Hello and welcome to your personal mailbox. \r\n Mail functionality is currently under development.", 
      ],
      MODE: "get"
    }

    let request: IMail = {
      EMAIL: [
        this.auth.getUsername(),
        '',
        '',
        '',
        '',
      ],
      MODE: "GET"
    }
    console.log(request);
    this.socket.send(JSON.stringify(request));

    this.emails.push(email1);
  }

  @HostListener('window:resize', ['$event'])
  private onResize() {
    this.pageHeight = window.innerHeight;
  }

}
