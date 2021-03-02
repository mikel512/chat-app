import { Component, OnInit, AfterViewInit} from '@angular/core';

/*
  The @Component decorator specifies the following:
  - selector: this specifies how the component will be called within
    an HTML file. For this specific component the HTML will look like:
        <app-root></app-root>
    You can observe this yourself in the index.html file.
  - templateUrl: specifies the path for the corresponding HTML file
  - styleUrls: specifies the paths for the CSS filesto be used within the
    HTML file. Note the array notation.
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
/*  This is the root component.
    Currently, the fuctions used here are for setting the size
    so that the app is responsive.
    The template(and HTML file is referred as a template in Angular) file
    for this component only includes the router outlet:
        <router-outlet></router-outlet>
    this specifies Angular to render routed components here.
*/
export class AppComponent implements OnInit, AfterViewInit{
  title = 'chat-app';
  heightWindow: number = window.innerHeight;
  navHeight: number = 0;
  contentHeight: number = 0;
  footerHeight: number = 0;

  constructor() {
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.contentHeight = this.heightWindow - (this.navHeight + this.footerHeight);
  }

  getNavSize(size: number) {
    this.navHeight = size;
  }

  getFooterSize(size: number) {
    this.footerHeight = size;
  }

}