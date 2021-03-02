import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ILogin } from 'src/app/interfaces/ilogin';
import { IMessage } from 'src/app/interfaces/IMessage';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { SwalService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  userObj: IMessage = {USERNAME: '', PASSWORD: '', MSG: ''};
  showTos: boolean = false;
  tosResponse: boolean = false;
  @ViewChild('modalBody') body!: ElementRef;

  constructor(private authService: CurrentUserService,
              private alert: SwalService) { }

  ngOnInit(): void { }

  onSubmit() {
    if(this.userObj.USERNAME === '' || this.userObj.PASSWORD === '') return;
    if(!this.tosResponse){
      this.alert.error("You must agree to the Terms and Conditions before proceeding.")
      return;
    }
    let userObj: ILogin = {
      "LOG-IN": [
        this.userObj.USERNAME,
        this.userObj.PASSWORD
      ]
    };

    this.authService.login(userObj);
  }

  toggleTos() {
    let element = this.body.nativeElement;
    if (this.showTos) {
      this.showTos = false;
      element.classList.remove('overflowStyle');
    } else {
      this.showTos = true;
      element.classList.add('overflowStyle');
    }
  }

}
