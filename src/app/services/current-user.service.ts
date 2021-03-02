import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../interfaces/ilogin';
import { IMessage } from '../interfaces/IMessage';
import { IRegistration } from '../interfaces/iregistration';
import { IVerification } from '../interfaces/iverification';
import { HttpService } from './http-services.service';
import { SwalService } from './sweet-alert.service';

@Injectable({
  providedIn: 'root'
})

/*
  Services are provided as "singletons" by default(means only one instance
  of the object is allowed in the app) and declared using dependency
  injection which means they must be declared in the constructor.

  This service handles all of the user authentication functions.
  Note the login, verify, and registration functions.
  The property userObj holds the token to authenticate each message a user
  sends to the server.

  Properties:
    isLoggedIn: boolean value used to signal if the user is logged in.
                Used by the auth guard.
    userObj:  the token used to send to the server
*/
export class CurrentUserService {
  isLoggedIn: boolean = false;
  private userObj!: IMessage;

  constructor(private router: Router,
              private swal: SwalService,
              private http: HttpService) { 

  }


  public login(payload: ILogin) {
    this.http.postAuth(JSON.stringify(payload)).subscribe({
      next: data => {
        let response: string = Object.keys(data)[0];
        let serverData: any = Object.values(data)[0];
        if(serverData[0] === 'OK') {
          this.swal.success("Login successful. Redirecting.", 1500);
          this.isLoggedIn = true;
          this.setUserObj(payload["LOG-IN"][0], response, '')


          this.router.navigate(['/main-app']);
        }
        else this.swal.error(JSON.stringify(data));
      },
      error: data => {
        this.swal.error(JSON.stringify(data));
      }
    });

  }

  private setUserObj(username:string, password:string, msg:string) {
    this.userObj = {
      "USERNAME": username,
      "PASSWORD": password,
      "MSG": msg
    };

  }

  public logoutUser() {
    this.setUserObj('','','');
    this.isLoggedIn = false;
    this.router.navigate(['/'])
  }

  public getUsername() {
    return this.userObj.USERNAME;
  }

  public getUser(): IMessage {
    return this.userObj;
  }

  public setMessage(msg: string) {
    this.userObj.MSG = msg;
  }

  public resetMessage() {
    this.userObj.MSG = '';
  }

  public verify(payload: IVerification) {
    let send = JSON.stringify(payload)
    this.http.postAuth(send).subscribe({
      next: data => {
        let response: string = Object.keys(data)[0];
        let serverData: any = Object.values(data)[0];
        if(serverData[0] === 'OK') {
          this.swal.success(JSON.stringify(response + " You may now log in."));
          this.logoutUser();
        }
        else this.swal.error(JSON.stringify(data));
      },
      error: data => {
        this.swal.error(JSON.stringify(data));
      }
    });

  }

  public register(payload: IRegistration) {
    let send = JSON.stringify(payload)
    this.http.postAuth(send).subscribe({
      next: data => {
        let response: string = Object.keys(data)[0];
        let serverData: any = Object.values(data)[0];

        if(serverData[0] === 'OK') {
          this.swal.success(JSON.stringify(response));
          this.setUserObj(payload["REGISTRATION"][0], '', '');
          this.isLoggedIn = true;

          this.router.navigate(['/verify-page']);
        }
        else this.swal.error(JSON.stringify(data));
      },
      error: data => {
        this.swal.error(JSON.stringify(data));
      }
    });
  }
}
