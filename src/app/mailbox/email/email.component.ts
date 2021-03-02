import { Component, Input, OnInit } from '@angular/core';
import { IMail } from 'src/app/interfaces/imail';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  @Input() email!: IMail;

  constructor() { }

  ngOnInit(): void {
  }

}
