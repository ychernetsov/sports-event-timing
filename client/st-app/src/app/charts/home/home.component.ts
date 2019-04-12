import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectAllSportsmen, selectAllResults, resultsAdded, sportsmenCount, filterAllResults, resultsCount, raceFinished } from '../charts.selectors';
import { AllSportsmenRequested, AllResultsRequested, ResultAdded, ResultUpdated, RemoveAllResults } from '../charts.actions';
import { Results } from '../model/results.model';
import { SocketService } from '../services/socket.service';
import { tap, map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  sportsmen$: Observable<any[]>;
  results$: Observable<any[]>;
  resultsAdded$: Observable<number>;
  sportsmenCount$: Observable<number>;
  resultsCount$: Observable<number>;
  raceStarted = false;
  raceFinished$: Subscription;
  forSportsmen = ['start_number', 'sportsmanName', 'sportsmanLastname'];
  forResults = ['start_number', 'sportsmanName', 'sportsmanLastname', 'finishing', 'crossed'];
  min = 0; sec = 0; msec = 0;
  timer = 0;
  interval;


  constructor(private socket: SocketService, private store: Store<AppState>) { }

  ngOnInit() {


    this.store.dispatch(new AllSportsmenRequested());
    this.sportsmen$ = this.store.pipe(
      select(selectAllSportsmen)
    );

    this.store.dispatch(new AllResultsRequested());
    this.results$ = this.store.pipe(
      select(filterAllResults)
    );

    this.resultsAdded$ = this.store.pipe(
      select(resultsAdded)
    )

    this.sportsmenCount$ = this.store.pipe(
      select(sportsmenCount)
    );

    this.resultsCount$ = this.store.pipe(
      select(resultsCount)
    )

    this.raceFinished$ = this.store.pipe(
      select(raceFinished),
      tap(data => data)
    ).subscribe(finished => {
      if(finished) this.raceStarted = false;
    })

    this.socket.on('started').subscribe(
      data => {
        console.log("start ", data)
        this.raceStarted = true;
      }
    );

    this.socket.on('finished').subscribe(
      data => {
        this.raceStarted = false;
      }
    );

  }

  start(): void {
      this.store.dispatch(new RemoveAllResults());
      this.socket.emit('start');
      this.startclock();
  }

  startclock(): void {

    this.interval = setInterval(() => {
      this.timer++;
      this.msec += 1;
      if (this.timer % 6000 === 0) {
        this.min += 1;
        if (this.min > 59) {
          this.min = 0;
        }
      }
      if (this.timer % 100 === 0) {
        this.sec += 1;
        if (this.sec > 59) {
          this.sec = 0;
        }
      }
      if (this.msec > 999) {
        this.msec = 0;
      }
    }, 10);
  }

  clearTable(interval) {
    clearInterval(interval);
    this.min = 0;
    this.sec = 0;
    this.msec = 0;
  }

  ngOnDestroy() {
    this.raceFinished$.unsubscribe();
  }
}
