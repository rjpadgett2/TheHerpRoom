import { Component, OnInit } from '@angular/core';
import {CalendarComponentOptions} from "ion2-calendar";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  date: string;
  type: 'string';

  constructor() { }

  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };

  ngOnInit() {
  }

}
