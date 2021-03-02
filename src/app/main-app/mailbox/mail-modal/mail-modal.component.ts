import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-mail-modal',
  templateUrl: './mail-modal.component.html',
  styleUrls: ['./mail-modal.component.css']
})
export class MailModalComponent implements OnInit {

  constructor(private mail: EmailService) { }

  ngOnInit(): void {
  }

  getNewMail() {
    this.mail.requestMails();
  }

}
