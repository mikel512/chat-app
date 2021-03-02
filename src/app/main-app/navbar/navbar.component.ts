import { AfterViewInit, EventEmitter, Output, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { CurrentUserService } from '../../services/current-user.service';
import { SwalService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-navbar-good',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
/*
  This is the Navbar component(the top bar). It contains the name of the current user,
  the link to additional options(currently only theme changing), and the logout button.

  Properties:
    nav:  the Element referenced in the 
          template as #navbar(see html file)
    onHeightSet:  an EventEmitter that emits the height of this component
                  to the parent component.(For responsive purposes)
    onModeSet:  an EventEmitter that emits the string name of the 
                theme name to parent component
    colorThemes:  array which holds theme names
    contentHeight: value to be emitted by onHeightSet
    username: current user's name
*/
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navbar') nav!: ElementRef;
  @Output() onHeightSet = new EventEmitter<number>();
  @Output() onModeSet = new EventEmitter<string>();
  colorThemes: string[] = ['default', 'light', 'invert'];
  contentHeight: number = 0;
  username: string = '';

  constructor(private currentUser: CurrentUserService,
              private mail: EmailService,
              private alerts: SwalService,
              private socket: WebsocketService) { }

  ngOnInit(): void {
    this.username = this.currentUser.getUsername();
  }

  onLogout() {
    this.socket.logoff();
    this.alerts.success('Logoff successful.');
  }

  ngAfterViewInit(): void {
    this.contentHeight = this.nav.nativeElement.offsetHeight;
    this.onHeightSet.emit(this.contentHeight);
  }

  /*
    Toggle functions emit the string name of the theme.
    For the next step, take a look at
    main-app.component.html
  */
  toggleLight() {
    this.onModeSet.emit(this.colorThemes[1]);
    this.setLightClasses();
  }
  toggleInvert() {
    this.onModeSet.emit(this.colorThemes[2]);
    this.setInvertClasses();
  }
  toggleDefault() {
    this.onModeSet.emit(this.colorThemes[0]);
    this.setDefaultClasses();
  }

  // theme functions
  setLightClasses() {
    this.removeCSSColor();
    let component = this.nav.nativeElement;
    component.classList.add('navbar-dark');
    component.classList.add('bg-primary');
  }
  setInvertClasses() {
    this.removeCSSColor();
    let component = this.nav.nativeElement;
    component.classList.add('navbar-light');
    component.classList.add('bg-light');

  }
  setDefaultClasses() {
    this.removeCSSColor();
    let component = this.nav.nativeElement;
    component.classList.add('navbar-dark');
    component.classList.add('bg-dark');
  }
  removeCSSColor() {
    let component = this.nav.nativeElement;
    component.classList.remove('navbar-light');
    component.classList.remove('bg-primary');
    component.classList.remove('navbar-dark');
    component.classList.remove('bg-dark');
    component.classList.remove('bg-light');

  }

}
