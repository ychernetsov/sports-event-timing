import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  @Input() charts: Observable<any[]>;
  @Input() columnsToDisplay;
  @Input() isResults;

  socket;

  constructor() {
    this.socket = io();
  }

  ngOnInit() {
    this.socket.on('newResultAdded', ()=> {
      console.log("added")
    })
  }
}
