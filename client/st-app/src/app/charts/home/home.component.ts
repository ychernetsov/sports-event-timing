import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sportsmen } from '../model/sportmen.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectAllSportsmen, selectAllResults, resultsAdded, sportsmenCount } from '../charts.selectors';
import { AllSportsmenRequested, AllResultsRequested, ResultAdded, ResultUpdated, RemoveAllResults } from '../charts.actions';
import { Results } from '../model/results.model';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sportsmen$: Observable<any[]>;
  results$: Observable<any[]>;
  resultsAdded$: Observable<number>;
  sportsmenCount$: Observable<number>;
  raceStarted: boolean = false;
  forSportsmen = ['start_number', 'sportsmanName', 'sportsmanLastname'];
  forResults = ['start_number', 'sportsmanName', 'sportsmanLastname', 'finishing', 'crossed'];
  min = 0; sec = 0; msec = 0;
  total: number = 0;
  finished: number = 0;
  timer = 0;


  constructor(private socket: SocketService, private store: Store<AppState>) { }

  ngOnInit() {

    this.store.dispatch(new AllSportsmenRequested())
    this.sportsmen$ = this.store.pipe(
      select(selectAllSportsmen)
    );

    this.store.dispatch(new AllResultsRequested())
    this.results$ = this.store.pipe(
      select(selectAllResults)
    );
    this.resultsAdded$ = this.store.pipe(
      select(resultsAdded)
    );

    this.sportsmenCount$ = this.store.pipe(
      select(sportsmenCount)
    );


    this.socket.on('started').subscribe(
      data => {
        this.raceStarted = true;
      }
    );

    this.socket.on('finished').subscribe(
      data => {
        this.raceStarted = false;
      }
      
    );

    if(this.sportsmenCount$ === this.resultsAdded$) {
      this.socket.emit("finished");
      this.raceStarted = false;
    }

  }

  start() {
      this.store.dispatch(new RemoveAllResults());
      this.socket.emit('start');
      this.startclock();
  }

  startclock(): void {

    setInterval(() => {
      this.timer++
      this.msec += 1;
      if(this.timer % 6000 === 0) {
        this.min += 1;
        if(this.min > 59) {
          this.min = 0;
        }
      }
      if(this.timer % 100 === 0) {
        this.sec += 1;
        if(this.sec > 59) {
          this.sec = 0;
        }
      }
      if(this.msec > 999) {
        this.msec = 0
      }
    }, 10);
  }
}
