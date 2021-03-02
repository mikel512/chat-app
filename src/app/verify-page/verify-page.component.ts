import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IVerification } from '../interfaces/iverification';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.component.html',
  styleUrls: ['./verify-page.component.css']
})
export class VerifyPageComponent implements OnInit {
  verifyForm?: FormGroup;
  pageHeight: number = window.innerHeight;
  pageWidth: number = window.innerWidth;

  constructor(private authService: CurrentUserService) { }

  /*
    this is the function called when the component is initialized.
    It instantiates a new FormGroup(for the verification number)
    and adds Validators. Additional commentary is in the template file.
  */
  ngOnInit(): void {
    this.verifyForm = new FormGroup({
      smsCode: new FormControl(this.smsCode, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])
    });
  }

  /*
    This function is called when the Validate button is clicked.
    It creates a IVerification interface to be sent to the server.
  */
  onSubmit() {
    let serverMsg: IVerification = {
      VERIFICATION: [
        this.authService.getUsername(),
        this.smsCode?.value, 
        'RESPONSE'
      ]
    };

    this.authService.verify(serverMsg);
  }

  onRequestNewVerification() {
    let serverMsg: IVerification = {
      VERIFICATION: [
        this.authService.getUsername(),
        '', 
        'REVERIFY'
      ]
    };
  }

  get smsCode() {
    return this.verifyForm?.get('smsCode');
  }

  @HostListener('window:resize', ['$event'])
  private onResize() {
    this.pageHeight = window.innerHeight;
    this.pageWidth = window.innerWidth;
  }

}
