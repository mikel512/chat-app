import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { IRegistration } from 'src/app/interfaces/iregistration';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { SwalService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
/*
  This component holds the registration form

  Properties:
    registerForm: the FormGroup holding all the inputs of the form.
                  Implements validators on initialization. 
    phoneNum: phone number
*/
export class RegistrationFormComponent implements OnInit {
  registerForm?: FormGroup;
  phoneNum: string = '';
  showTos: boolean = false;
  @ViewChild('modalBody') body!: ElementRef;

  constructor(private authService: CurrentUserService,
              private alert: SwalService) {

  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(this.username, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z]*')
      ]),
      phone: new FormControl(this.phone, [
        Validators.required
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(8)
      ]),
      passwordConfirm: new FormControl(this.passwordConfirm, [
        Validators.required,
        Validators.minLength(8)
      ]),
      tosResponse: new FormControl(this.tosResponse, [
        Validators.requiredTrue
      ])
    }, {validators: this.matchingPasswords});
  }


  onSubmit() {
    console.log(this.tosResponse)
    // if(!this.tosResponse){
    //   this.alert.error("You must agree to the Terms and Conditions before proceeding.")
    //   return;
    // }
    this.phoneNum = this.phoneNum.replace(/[-()\s]/g, '');
    // set registration object 
    let serv: IRegistration = {
      REGISTRATION: [
        this.username?.value, 
        this.password?.value,
        this.phoneNum
      ]
    };

    this.authService.register(serv)
  }

  get username() {
    return this.registerForm?.get('username');
  }
  get phone() {
    return this.registerForm?.get('phone');
  }
  get password() {
    return this.registerForm?.get('password');
  }
  get passwordConfirm() {
    return this.registerForm?.get('passwordConfirm');
  }
  get tosResponse() {
    return this.registerForm?.get('tosReponse');
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
  
  matchingPasswords: ValidatorFn = (control: AbstractControl) => {
    const pass = control.get('password');
    const passConfirm = control.get('passwordConfirm');

    if(pass?.value !== passConfirm?.value) {
      return {mismatchedPasswords: true};
    }
    return null;
  };

}
