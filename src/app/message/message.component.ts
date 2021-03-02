import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

/* 
  This component is only a template for displaying each message in the
  log.
*/
export class MessageComponent implements OnInit {
  @Input() msg!: IMessage;
  @Output() userMsgPair = new EventEmitter<string[]>();
  reported: string = '';
  msgRep: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  onSendMessage() {

  }
  
  onChooseUser() {
    let array = [this.msg.USERNAME, this.msg.MSG];
    this.userMsgPair.next(array);
  }

}
