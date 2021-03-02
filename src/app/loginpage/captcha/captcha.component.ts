import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser'
import { HttpService } from 'src/app/services/http-services.service';
import { SwalService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit, OnChanges{
  captchaResponse: string = '';
  captchaImg: SafeResourceUrl = '';
  tosResponse: boolean = false;
  showTos: boolean = false;
  @Output() onValidation = new EventEmitter<boolean>();
  @Input() getCaptcha: boolean = false;
  @ViewChild('modalBody') body!: ElementRef;

  constructor( private http: HttpService,
              private sanitizer: DomSanitizer,
              private alert: SwalService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.getCaptcha) {
      this.captchaImg = this.http.getCaptchaImage()
        .subscribe(data => {
          this.captchaImg = this.sanitizer.bypassSecurityTrustResourceUrl(data);
        });
    }
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

  onSubmit() {
    if(this.captchaResponse === '') return;
    if(!this.tosResponse){
      this.alert.error("You must agree to the Terms and Conditions before proceeding.")
      return;
    }

    this.http.postCaptchaResponse(this.captchaResponse).subscribe({
      next: data => {
        if(data) this.onValidation.emit(data);
        else this.alert.error("Invalid CAPTCHA.")
      },
      error: error => {
        console.error("There was an error", error);
      }
    });
  }

}
