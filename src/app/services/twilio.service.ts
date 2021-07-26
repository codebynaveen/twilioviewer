import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface HttpResponse {
  messages: Array<Message>
}

interface Message {
  account_sid: string,
  api_version: string,
  body: string,
  date_created: Date,
  date_sent: Date,
  date_updated: Date,
  direction: string,
  error_code: string,
  error_message: string,
  from: string,
  messaging_service_sid: string,
  num_media: string,
  num_segments: string,
  price: string,
  price_unit: string,
  sid: string,
  status: string,
  subresource_uris: {
    media: string
  },
  to: string,
  uri: string
}

@Injectable({
  providedIn: 'root'
})
export class TwilioService {

  baseUrl: string = 'https://api.twilio.com/2010-04-01'
  accountId: string
  token: string



  constructor(private http: HttpClient, private router: Router) {
  }

  getMessages(to?: number) {
    this.accountId = localStorage.getItem('sid')
    this.token = localStorage.getItem('token')
    if (!this.accountId || !this.token) {
      this.router.navigate(['/auth'])
      return;
    }
    let authHash = btoa(`${this.accountId}:${this.token}`);
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Basic ${authHash}` })
    };
    return this.http.get<HttpResponse>(`${this.baseUrl}/Accounts/${this.accountId}/Messages.json${to ? '?To=' + to : ''}`, httpOptions)
  }
}
