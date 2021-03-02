import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() getCaptcha: boolean = false;
  showForm: boolean = false;

  constructor() {}

  ngOnInit() {
  }

  setShowForm(val: boolean) {
    this.showForm = val;
  }

}
