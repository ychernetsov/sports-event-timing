import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from '../services/socket.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ResultAdded, ResultUpdated } from '../charts.actions';
import { MatSort } from '@angular/material/sort';
import { sportsmenCount, resultsCount } from '../charts.selectors';




@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  @Input() charts$: Observable<any[]>;
  @Input() columnsToDisplay;
  @Input() isResults;
  sportsmenCount$: Observable<number>;
  resultsCount$: Observable<number>;

  constructor(private socket: SocketService, private store: Store<AppState>) {}

  ngOnInit() {
    this.sportsmenCount$ = this.store.pipe(
      select(sportsmenCount)
    );

    this.resultsCount$ = this.store.pipe(
      select(resultsCount)
    );

    this.socket.on('saveResult').subscribe(
      data => {
          const resultObj = {
            'id': data.sportsman._id,
            'finishing': data.finishing,
            'crossed': data.crossed,
            'name': data.sportsman.name,
            'lastname': data.sportsman.lastname,
            'start_number': data.sportsman.start_number
          };

          this.store.dispatch(new ResultAdded(resultObj));
      }
    );

    this.socket.on('updateResult').subscribe(
      data => {
        const resultObj = {
          'id': data.sportsman._id,
          'finishing': data.finishing,
          'crossed': data.crossed,
          'name': data.sportsman.name,
          'lastname': data.sportsman.lastname,
          'start_number': data.sportsman.start_number
        };

        this.store.dispatch(new ResultUpdated(data.sportsman._id, resultObj));
      }
    );
  }
}
