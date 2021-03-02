import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IReport } from 'src/app/interfaces/ireport';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input() toReport: string = '';
  @Input() reportMsg: string = '';
  reportForm?: FormGroup;

  constructor(private authServ: CurrentUserService,
              private socket: WebsocketService) { }

  ngOnInit(): void {
    this.reportForm = new FormGroup({
      type: new FormControl(this.type, [
        Validators.required
      ]),
      comment: new FormControl(this.comment, [
        Validators.required
      ]),
      urgent: new FormControl(this.urgent)
    });
  }

  get type() {
    return this.reportForm?.get('type');
  }

  get comment() {
    return this.reportForm?.get('comment');
  }

  get urgent() {
    return this.reportForm?.get('urgent');
  }

  onSubmit() {
    let report: IReport = {
      REPORT_USER: [this.type?.value, this.toReport, 
        this.authServ.getUsername(), this.reportMsg,
        this.comment?.value, this.urgent?.value]
    };
    console.log(report);
    this.socket.send(JSON.stringify(report));
  }

}
