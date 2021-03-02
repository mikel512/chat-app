import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IMail } from '../interfaces/imail';
import { IMessage } from '../interfaces/IMessage';
import { CurrentUserService } from './current-user.service';
import { EmailService } from './email.service';
import { SwalService } from './sweet-alert.service'

@Injectable({
  providedIn: 'root'
})
/*
  Services are provided as "singletons" by default(means only one instance
  of the object is allowed in the app) and declared using dependency
  injection which means they must be declared in the constructor.

  This is the service that provides the Websocket functionality. This
  service is also made only available to the main-app component which is
  lazy-loaded. This means that there is no Websocket connection until the
  user is authenticated and routed to the main-app.

  Properties:
    isOpen: boolean Subject. Allows for the chat component to listen
            for the socket being open.
    addMessage: IMessage Subject. Allows the chat component to listen 
                for new messages from the servers.
    userlist: string array of online usernames.
    serverMessages: dictionary to store unique messages. Contains one key-value
                    pair which is {id: IMessage} format.
    socket: contains the Websocket object
*/
export class WebsocketService {
  // Subjects allow for subscribing to these properties for changes.
  isOpen = new Subject<boolean>();
  addMessage = new Subject<IMessage>(); // to send messages to component
  // addEmail = new Subject<IMail>(); // to send messages to component
  private userlist: string[] = [];
  private serverMessages: { [id: number]: IMessage } = {}; // dictionary to store unique messages
  private socket = new WebSocket("");
  private mailbox: {in: string[][], out: string[][]} = { in: [], out: []}
  private inboxCount: { [id: number] : IMail} = {};
  private outboxCount: { [id: number] : IMail} = {};
  inbox = new Subject<IMail>();
  outbox = new Subject<IMail>();

  constructor(private alerts: SwalService,
    private authService: CurrentUserService) {
    if(this.socket.readyState === this.socket.CLOSED) this.socket = new WebSocket("wss://chat.autismchat.org/");
    this.socket.addEventListener('open', (event => {
      console.log("SOCKET OPEN");
      this.isOpen.next(true);
      this.getMessages();
    }));
    this.socket.addEventListener('close', (event => {
      // alerts.warning("Socket has been closed, redirecting to login page.")
      console.log("SOCKET CLOSE");
      this.logoff();
    }));
    this.socket.addEventListener('error', (event => {
      alerts.error("Socket error detected, redirecting to login page.")
      console.log("SOCKET ERROR");
      this.logoff();
    }));
    this.socket.addEventListener('message', (event => {
      this.recieveHandler(event);
    }))
  }

  // simple send function
  send(content: string) {
    this.socket.send(content);
  }

  // logoff function
  public logoff() {
    this.socket.close();
    this.authService.logoutUser();
  }

  // this is the function that handles server messages
  private recieveHandler(event: MessageEvent) {
    let dat = JSON.parse(event.data); // dictionary
    let response: string = Object.keys(dat)[0];
    let serverData: any = Object.values(dat)[0];

    switch (response) {
      case "ERROR":
        // this.alerts.error(serverData[1]);
        if(serverData[0] === '10018') { }
        break;
      case 'OK':
        console.log(serverData);
        this.alerts.success(serverData[1], 1000);
        // if(serverData[0] === '20000') { }
        // if(serverData[0] === '20002') { }
        break;
      case "CHATDATA":
        this.setMessages(serverData[0]);
        this.userlist = dat["WHOIS"];
        
        break;
      case "MAIL":
        let obj = JSON.parse(serverData);
        console.log(obj);
        // serverData[0] = Inbox; serverData[1] = Outbox
        this.setMailDict(obj[0], obj[1]);
        break;
      default:
        this.alerts.warning("No server message");
        break;
    }
  }


  /* 
    This function sets the messages into the serverMessages property
    in order to avoid repeated messages inserting into the chat.
    Checks by message id then emits incoming message.
  */
  private setMessages(messages: string) {
    for (const entry of messages) {
      let msgId: number = +entry[0];
      if (!(msgId in this.serverMessages)) {
        var incoming: IMessage = {
          USERNAME: entry[1],
          PASSWORD: '',
          MSG: entry[2]
        }
        this.serverMessages[msgId] = incoming;
        this.addMessage.next(incoming);
      }
    }
  }

  private setMailboxes() {
    let incoming = this.mailbox.in;
    let outgoing = this.mailbox.out;
    for (let i = 0; i < incoming.length; i++) {
      if (+incoming[i][0] in this.inboxCount) continue;
      this.processMail(incoming[i], 'inbox');
    }
    for (let i = 0; i < outgoing.length; i++) {
      if (+outgoing[i][0] in this.outboxCount) continue;
      this.processMail(outgoing[i], 'outbox');
    }
  }

  private processMail(email: string[], box: string) {
    if (box === 'inbox') {
      let newMail: IMail = {
        EMAIL: [
          email[0],
          email[1],
          '',
          email[2],
          email[3],
          email[4]
        ],
        MODE: ''
      }
      this.inboxCount[+email[0]] = newMail;
      this.inbox.next(newMail);
    } else {
      let newMail: IMail = {
        EMAIL: [
          email[0],
          '',
          email[1],
          email[2],
          email[3],
          email[4]
        ],
        MODE: ''
      }
      this.outboxCount[+email[0]] = newMail;
      this.outbox.next(newMail);
    }
  }

  private setMailDict(incoming: string[][], outgoing: string[][]) {
    this.mailbox.in = incoming;
    this.mailbox.out = outgoing;
    this.setMailboxes();
  }


  /* 
    Function to allow component to grab the initial 10 sent messages
    sent by the server.
    Loops through the values of the serverMessages array
    (the keys are IDs which are not currently needed in the
    chat component) and emits them through the addMessage
    Subject. Called on socket open.
  */
  public getMessages() {
    Object.values(this.serverMessages).forEach(e => this.addMessage.next(e));
  }

  public getUserList() {
    return this.userlist;
  }

  public getNumUsers() {
    return this.userlist.length;
  }
}