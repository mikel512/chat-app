import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/*
  This is the registration component. It holds the
  registration form, which is in a seperate component.

  Properties:
    getCaptcha: @Input that recieves a boolean from the 
                loginpage component
    showForm: controls if the form is to be shown.
              If showForm == false, show CAPTCHA, 
              if showForm == true, show form.
*/
export class RegisterComponent implements OnInit {
  @Input() getCaptcha: boolean = false;
  showForm: boolean = false;

  constructor() {}

  ngOnInit() {
  }

  setShowForm(val: boolean) {
    this.showForm = val;
  }
  
}
