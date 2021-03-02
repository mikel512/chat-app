import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
  Services are provided as "singletons" by default(means only one instance
  of the object is allowed in the app) and declared using dependency
  injection which means they must be declared in the constructor.
  
  This service is responsible for connecting to the HTTP using the HttpClient
  provided by Angular.
  Functions that expect a return from the server can return an Observable
  of any type desired. This will allow the caller to subscribe for responses.
*/

export class HttpService {
  private requestPath: string = '';


  constructor(private http: HttpClient,) { }

  /* GET CAPTCHA image */
  getCaptchaImage() {
    return this.http.get(this.requestPath, {responseType: 'text'});
  }

  postCaptchaResponse(respond: string): Observable<boolean> {
    const options = new HttpParams().set("auth-route", "captcha")

    return this.http.post<boolean>(this.requestPath, respond, 
      {params: options});
  }

  postAuth(payload: string): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });
    const options = new HttpParams().set("auth-route", "auth")

    return this.http.post<boolean>(this.requestPath, payload, 
      { headers: headers, params: options });

  }
}
