import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppRoutingModule } from './main-app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainAppComponent } from './main-app.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from '../message/message.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReportComponent } from './report/report.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { EmailComponent } from './mailbox/email/email.component';
import { MailModalComponent } from './mailbox/mail-modal/mail-modal.component';

/*
  This is the module for main-app component.
  Since it is lazy-loaded, it requires its own module and routing module.
  The way declarations and imports work is the same as the
  app.module.ts file. With the exception of "providers".
  The WebsocketService here is declared as a provider
  since it is a service only available to this module, currently.
*/
@NgModule({
  declarations: [
    MainAppComponent,
    ChatComponent,
    MessageComponent,
    NavbarComponent,
    SidebarComponent,
    ReportComponent,
    SendMailComponent,
    MailboxComponent,
    EmailComponent,
    MailModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainAppRoutingModule,
    FormsModule,
  ],
})
export class MainAppModule { }