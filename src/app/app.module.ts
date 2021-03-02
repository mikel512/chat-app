import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './loginpage/register/register.component';
import { PhoneMaskDirective } from './loginpage/register/phone-mask.directive';
import { LoginComponent } from './loginpage/login/login.component';
import { VerifyPageComponent } from './verify-page/verify-page.component';
import { CaptchaComponent } from './loginpage/captcha/captcha.component';
import { RegistrationFormComponent } from './loginpage/register/registration-form/registration-form.component';
import { LoginFormComponent } from './loginpage/login/login-form/login-form.component';
import { TermsComponent } from './loginpage/terms/terms.component';

/* 
  This is the main module for the app.
  The declarations section declares the components used in the app.[compare to imports]
  Lazy-loaded components are not declared here but rather in their
  own modules.[imports loaded later ]
  The imports section mainly imports Angular libraries like the http client
  and the library that handles forms. It also includes an import for the
  routing module.
*/
@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    RegisterComponent,
    PhoneMaskDirective,
    LoginComponent,
    VerifyPageComponent,
    CaptchaComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    TermsComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
