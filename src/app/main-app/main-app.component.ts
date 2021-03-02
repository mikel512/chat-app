import { AfterViewInit, Component, HostListener, OnInit, Output } from '@angular/core';
import { EmailService } from '../services/email.service';
import { WebsocketService } from '../services/websocket.service';
declare var $: any;

/*
  WebsocketService is set as the provider here and not in the 
  component module. This indicates to Angular that this service will
  only be used inside this component. Also indicates to create
  a new instance for each navigation to the component.
*/
@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css'],
  providers: [WebsocketService, EmailService]
})

/* 
  This class is similar to app.component
  The exceptions are the theme functions which are included in most
  child components of the main-app component. These functions are in charge
  of changing the themes of the main app by changing css classes.
  In the future this functionality should be moved to its own service
  in order to have a centralized place to change themes. This will make it much
  easier in the future to implement new themes(scalability).

  For a full walkthrough of the themes funcionality, start at
    navbar.component.ts

  Properties:
    heightWindow: the height of the window in px
    navHeight:  height of navbar in px. Set by navbar component
    contentHeight:  height of chat component. It is calculated by the
                    setContentHeight function.
    theme:  the name of the current set theme.
*/
export class MainAppComponent implements OnInit, AfterViewInit{
  @Output() windowHeight: number = window.innerHeight;
  navHeight: number = 0;
  footerHeight: number = 0;
  contentHeight: number = 0;
  theme: string = 'default';
  chooseUser: string = '';

  reportMsg: string = '';

  constructor() { }

  ngOnInit() { 
  }

  ngAfterViewInit() {
    this.setContentHeight();
  }

  setContentHeight() {
    this.contentHeight = this.windowHeight - (this.navHeight + this.footerHeight);
  }

  setChosenUser(user: string) {
    this.chooseUser = user;
  }

  setUserMsgPair(pair: string[]) {
    this.chooseUser = pair[0];
    this.reportMsg = pair[1];
  }

  getNavSize(size: number) {
    this.navHeight = size;
  }

  getFooterSize(size: number) {
    this.footerHeight = size;
  }

  @HostListener('window:resize', ['$event'])
  private onResize() {
    this.setContentHeight();
  }

  /* 
    This function sets the theme property
    to the setting argument. This is because the chat
    component is listening for changes of the theme property.
    For the next step take a look at the chat component.
  */
  setMode(setting: string) {
    this.theme = setting;
    switch(this.theme) {
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

  // theme functions
  /*
    The following functions use jQuery to
    alter the theme classes. It will probably be a better
    idea in the future to reduce dependency on jQuery
  */
  setLightClasses() {
    this.removeCSSColor();
    $('#sidebar').addClass('bg-info');
  }
  setDefaultClasses() {
    this.removeCSSColor();
    $('#mainChat').addClass('bg-dark');
    $('#sidebar').addClass('bg-secondary');
  }
  setInvertClasses() {
    this.removeCSSColor();
    $('#mainChat').addClass('bg-secondary');
    $('#sidebar').addClass('bg-light');
  }

  removeCSSColor() {
    $('#mainChat').removeClass('bg-dark');
    $('#mainChat').removeClass('bg-secondary');
    $('#sidebar').removeClass('bg-info');
    $('#sidebar').removeClass('bg-secondary');
    $('#sidebar').removeClass('bg-light');

  }
}
