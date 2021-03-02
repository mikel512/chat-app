import { EventEmitter, AfterViewInit, AfterViewChecked, Component, ElementRef, OnInit, ViewChild, Output, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { IMessage } from 'src/app/interfaces/IMessage'
import { CurrentUserService } from 'src/app/services/current-user.service';
import { SwalService } from 'src/app/services/sweet-alert.service';
import { WebsocketService } from 'src/app/services/websocket.service'
declare var $: any;

@Component({
  selector: 'app-chat-good',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
/*
  This is the main chat component. It holds the chat log and the input element to send
  messages.

  Properties:
    button: element selector for #sendBtn
    footer: element selector for #footer
    input:  element selector for #input 
    viewMode: @Input for the selected theme. It is tied to the theme property from
              main-app.component
    isInitialized:  boolean value that changes to true once the component
                    has initialized. This is to avoid the theme changes to apply
                    to an undefined component.
    messages: an IMessage array
    newMessage: the new message a user types to send to the server
    footerHeight: the height of the footer element. This is used to set the
                  height of the chat log
    numUsers: the number of users currently logged in. Displayed in the footer.
*/
export class ChatComponent implements AfterViewInit, OnInit, AfterViewChecked, OnChanges {
  // @Output() onHeightSet = new EventEmitter<number>();
  @ViewChild('sendBtn') button!: ElementRef;
  @ViewChild('footer') footer!: ElementRef;
  @ViewChild('input') input!: ElementRef;
  @Input() viewMode: string = 'default'; 
  @Output() onChosenUser = new EventEmitter<string[]>();
  isInitialized: boolean = false;
  hackyCounter: number = 0;
  messages: IMessage[] = [];
  newMessage: string = '';
  messageMaxLength: number = 1000;
  footerHeight: number = 0;
  numUsers: number = 0;

  /*
    addMessage property from the WebsocketService is subscribed to in order
    to push new messages coming in to the local messages array. The ngFor directive
    in the template file is responsible for generating new message components from this array.

    isOpen property from the WebsocketService is subscribed to in 
    order to prevent the loop from starting before the Websocket opens.
    Without this check the loop only runs once.
  */
  constructor(private socket: WebsocketService,
    private currentUser: CurrentUserService,
    private swalert: SwalService) {
    socket.addMessage.subscribe((value) => {
      this.playAudio();
      if (this.messages.length < 10){
        this.messages.unshift(value);

      } else {
        this.messages.push(value);
      }
      this.scrollToBottom();
    });
    socket.isOpen.subscribe((value) => {
      if(value) this.startLoop();
    })
  }

  playAudio() {
    let audio = new Audio();
    audio.src = '/assets/chat1.mp3';
    audio.load();
    audio.play();
  }

  startLoop() {
    if (this.currentUser.isLoggedIn) {
      let userstring = JSON.stringify(this.currentUser.getUser());
      console.log('starting loop with: ' + userstring);
      this.socket.send(userstring);
      this.numUsers = this.socket.getNumUsers();

      setTimeout(() => { this.startLoop() }, 5000);
    }
  }

  emitUserMsg(pair: string[]) {
    this.onChosenUser.next(pair);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.footerHeight = this.footer.nativeElement.offsetHeight;
    this.scrollToBottom();
  }


  ngAfterViewChecked() {
    if (this.hackyCounter < 16  || this.hackyCounter % 30 == 0) {
      this.scrollToBottom();
    }
    this.hackyCounter++;
  }

  sendMessage() {
    if (this.newMessage === '') return;
    if (this.newMessage.length > this.messageMaxLength) {
      this.swalert.error("Message exceeded max length");
      return;
    }
    this.currentUser.setMessage(this.newMessage);
    this.socket.send(JSON.stringify(this.currentUser.getUser()));
    this.currentUser.resetMessage();

    // let message: IMessage = {
    //   USERNAME: this.currentUser.getUsername(),
    //   PASSWORD: '',
    //   MSG: this.newMessage
    // }

    // this.messages.push(message);
    this.newMessage = '';
    // this.scrollToBottom();
  }

  scrollToBottom() {
    $('#messageColumn').scrollTop($('#mainChat').outerHeight());
    $('#messageColumn').scrollTop($('#mainChat').outerHeight());
  }

  /*
    ngOnChanges is an Angular function that acts as a listener
    of changes on @Input properties of the component. viewMode
    is the only @Input property of this component and its changes
    are related to theme change
  */
  ngOnChanges(changes: SimpleChanges) {
    if (this.isInitialized) {
      switch (this.viewMode) {
        case 'light':
          this.setLightClasses();
          break;
        case 'invert':
          this.setInvertClasses();
          break;
        default:
          this.setDefaultClasses();
      }

    }
  }

  // theme functions
  setLightClasses() {
    this.removeCSSColor();
    let component = this.footer.nativeElement;
    component.classList.add('bg-primary');
    component.classList.add('bg-gradient');
    let input = this.input.nativeElement;
    input.classList.add('bg-light');
    let btn = this.button.nativeElement;
    btn.classList.add('btn-outline-light');

    $('#messages').removeClass('text-light');
    $('#numUsers').addClass('text-light');
  }
  setInvertClasses() {
    this.removeCSSColor();
    let component = this.footer.nativeElement;
    component.classList.add('bg-light');
    let input = this.input.nativeElement;
    input.classList.add('bg-light');
    let btn = this.button.nativeElement;
    btn.classList.add('btn-primary');

    $('#messages').addClass('text-light');
    $('#numUsers').removeClass('text-light');
  }
  setDefaultClasses() {
    this.removeCSSColor();
    let component = this.footer.nativeElement;
    component.classList.add('bg-dark');
    let input = this.input.nativeElement;
    input.classList.add('bg-dark');
    input.classList.add('text-light');
    let btn = this.button.nativeElement;
    btn.classList.add('btn-outline-light');

    $('#messages').addClass('text-light');
    $('#numUsers').addClass('text-light');
  }

  removeCSSColor() {
    let component = this.footer.nativeElement;
    component.classList.remove('bg-primary');
    component.classList.remove('bg-gradient');
    component.classList.remove('bg-dark');
    component.classList.remove('bg-light');
    let input = this.input.nativeElement;
    input.classList.remove('bg-light');
    input.classList.remove('bg-dark');
    input.classList.remove('text-light');
    let btn = this.button.nativeElement;
    btn.classList.remove('btn-outline-light');
    btn.classList.remove('btn-primary');
    $('#messages').removeClass('text-light');
    $('#numUsers').removeClass('text-light');
  }

}