import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwilioService } from '../services/twilio.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  sid: string;
  token: string;
  errorMessage: string;
  constructor(private router: Router, private twilioService: TwilioService) { }

  ngOnInit() {
    this.sid = localStorage.getItem('sid');
    this.token = localStorage.getItem('token');
  }

  submit() {
    if (!this.sid || !this.token) {
      this.errorMessage = "Invalid Inputs";
      return;
    }
    localStorage.setItem('sid', this.sid);
    localStorage.setItem('token', this.token);
    this.twilioService.getMessages().subscribe(
      data => this.router.navigate(['/home']),
      err => this.errorMessage = "Invalid Credentials"
    )
  }

  logout(){
    this.sid = null;
    this.token = null;
    localStorage.removeItem('sid');
    localStorage.removeItem('token');
  }

}
