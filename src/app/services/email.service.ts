import { Injectable } from '@angular/core';
import { IMail } from '../interfaces/imail';
import { CurrentUserService } from './current-user.service';
import { SwalService } from './sweet-alert.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private socket: WebsocketService,
    private auth: CurrentUserService,
    private alerts: SwalService) { }

  requestMails() {
    let request: IMail = {
      EMAIL: [
        this.auth.getUsername(),
        '',
        '',
        '',
        '',
        '',
      ],
      MODE: "GET"
    }
    // console.log(request);
    this.socket.send(JSON.stringify(request));

  }

  sendEmail(to: string, header: string, body: string) {
    if (header === '' || body === '') {
      this.alerts.error("Email must have a header and a body.")
      return;
    }
    let send: IMail = {
      EMAIL: [
        this.auth.getUsername(),
        to,
        header,
        body,
        '',
        ''
      ],
      MODE: "POST"
    }

    this.socket.send(JSON.stringify(send));
  }

}
