import { Component, HostListener, OnInit } from '@angular/core';
import { IMessage } from "../interfaces/IMessage"

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
/*
  This is the landing page for the current app.
  You may notice many duplicate divs in template file of this component.
  These duplicate divs handle the reponsive design of the 
  landing page.

  Properties:
    title: main title of page(has been replaced by an image)
    pageHeight: used to set window height for responsive design
    regCaptcha: boolean value that is set to true once the register button
                is clicked
    loginCaptcha: boolean value that is set to true once the login button
                  is clicked
    The boolean values are used to keep the registration and login CAPTCHAs
    seperate. They also function to keep the CAPTCHA from being requested 
    until the according buttons are clicked.
*/
export class LoginpageComponent implements OnInit{
  title:string = 'Chat Application';
  // userMessage: IMessage = {USERNAME: '', PASSWORD: '', MSG: ''};
  pageHeight: number = window.innerHeight;
  regCaptcha: boolean = false;
  loginCaptcha: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  private onResize() {
    this.pageHeight = window.innerHeight;
  }

  getRegCaptcha() {
    this.regCaptcha = true;
  }

  getLoginCaptcha() {
    this.loginCaptcha = true;
  }

}