import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { IMail } from 'src/app/interfaces/imail';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { EmailService } from 'src/app/services/email.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css'],
})
export class MailboxComponent implements OnInit {
  isInitialized: boolean = false;
  pageHeight: number = window.innerHeight;
  inbox: IMail[] = [];
  outbox: IMail[] = [];

  constructor( private mail: EmailService,
    private socket: WebsocketService) { 
      socket.isOpen.subscribe((value) => {
        if(value) {
          this.isInitialized = true;
          // setTimeout(m => this.mail.requestMails(), 500)
          mail.requestMails();
        }
      })
      socket.inbox.subscribe((mail) => {
        this.inbox.push(mail);
      })
      socket.outbox.subscribe((mail) => {
        this.outbox.push(mail);
      })

    }

  ngOnInit(): void {
    let email1: IMail = { 
      EMAIL: [
        "09283",
        "testest", 
        '', 
        "Hi!", 
        "Hello and welcome to your personal mailbox. \r\n Mail functionality is currently under development.",
        ''
      ],
      MODE: ""
    }

    this.inbox.push(email1);
  }

  @HostListener('window:resize', ['$event'])
  private onResize() {
    this.pageHeight = window.innerHeight;
  }

}

