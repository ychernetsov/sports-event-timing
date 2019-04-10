import { Component, OnInit, Input } from '@angular/core';
import { Observable, concat } from 'rxjs';
import { SocketService } from '../services/socket.service';
import {BehaviorSubject} from 'rxjs';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  @Input() charts: Observable<any[]>;
  @Input() columnsToDisplay;
  @Input() isResults;

  constructor(private socket: SocketService) {
    this.socket.emit('event', this.isResults).subscribe(
      (data) => {
          console.log('Success',data);
      },
      (error) => {
          console.log('Error',error);
      },
      () => {
          console.log('complete');
      }
    );
  }

  ngOnInit() {
    this.socket.on('currentData')
      .subscribe(
        data => {
          if(!this.charts) {
            this.charts = data;
          }
        }
      )
      
      
      this.socket.on("saveResult").subscribe(
        data => {
          this.charts = data;
        }
      )
  }
}
