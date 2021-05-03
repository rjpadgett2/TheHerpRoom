import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-username-validator',
  templateUrl: './username-validator.component.html',
  styleUrls: ['./username-validator.component.scss'],
})
export class UsernameValidatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  static validUsername(fc: FormControl){
    if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc"){
      return ({validUsername: true});
    } else {
      return (null);
    }
  }

}
