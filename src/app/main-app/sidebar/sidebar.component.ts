import { AfterViewChecked, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-sidebar-good',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
/*
  This component is the sidebar that holds the list
  that contains the online users.
  In smaller viewports and on mobile browsers it is currently
  hidden.
*/
export class SidebarComponent implements OnInit, AfterViewChecked {
  @Output() onChooseUser = new EventEmitter<string>();
  users: string[] = [];

  constructor(private socket: WebsocketService) { }

  ngOnInit(): void {
    this.users = this.socket.getUserList();
  }

  ngAfterViewChecked() {
    this.users = this.socket.getUserList();

  }
  
  setChosenUser(user: string) {
    this.onChooseUser.next(user);
  }

}
