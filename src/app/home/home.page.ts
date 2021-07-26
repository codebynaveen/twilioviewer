import { Component } from '@angular/core';
import { TwilioService } from '../services/twilio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  messages: Array<any>;
  selectedNumber: number;
  numbers: Array<number>;
  isLoading: boolean;
  statusMessage: string;

  constructor(private twilioService: TwilioService) {
  }

  ngOnInit() {
    this.numbers = JSON.parse(localStorage.getItem('phoneNumbers')) || []
  }

  getMessages(to) {
    this.isLoading = true;
    this.messages = [];
    this.selectedNumber = to;
    this.twilioService.getMessages(to).subscribe(
      data => {
        this.messages = data.messages;
        if (this.messages.length === 0) {
          this.statusMessage = "No Messages!";
        }
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        this.statusMessage = err.message;
      }

    )
  }

  addNewNumber($event) {
    let input = $event.target.value;
    if (input.charAt(0) === '+') {
      if (input.length > 1) {
        input = input.substring(1)
      }
      else {
        alert('Invalid Number');
        return;
      }

    }
    this.numbers.push(input);
    localStorage.setItem('phoneNumbers', JSON.stringify(this.numbers));
    $event.target.value = '';
  }

  deleteNumber(number) {
    let response = confirm("Are you sure you want to delete this number +" + number + ' ?')
    if (response === true) {
      this.numbers = this.numbers.filter(n => n !== number);
      localStorage.setItem('phoneNumbers', JSON.stringify(this.numbers))
      this.selectedNumber = null
    }
  }
}
