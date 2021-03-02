import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailboxRoutingModule } from './mailbox-routing.module';
import { MailboxComponent } from './mailbox.component';
import { EmailComponent } from './email/email.component';


@NgModule({
  declarations: [MailboxComponent, EmailComponent],
  imports: [
    CommonModule,
    MailboxRoutingModule,
  ]
})
export class MailboxModule { }
