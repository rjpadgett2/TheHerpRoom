import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please Enter a Valid Email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minLength', message: 'Password should be a minimum length of 5 characters' },
      { type: 'pattern', message: 'Must contain letters (both uppercase and lowercase) and numbers' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'areEqual', message: 'Passwords do not match' },
    ],
  }

}
