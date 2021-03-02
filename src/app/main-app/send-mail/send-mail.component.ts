import { Component, Input, OnInit } from '@angular/core';
import { IMail } from 'src/app/interfaces/imail';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { EmailService } from 'src/app/services/email.service';
import { SwalService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {
  @Input() toEmail: string = '';
  mailHeader: string = '';
  mailContent: string = '';

  constructor(private mail: EmailService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.mail.sendEmail(      
      this.toEmail,
      this.mailHeader,
      this.mailContent);
  }

}
