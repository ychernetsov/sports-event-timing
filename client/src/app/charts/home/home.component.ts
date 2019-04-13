import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectAllSportsmen, selectAllResults, resultsAdded, sportsmenCount, filterAllResults, resultsCount, raceFinished, selectStatus } from '../charts.selectors';
import { AllSportsmenRequested, AllResultsRequested, ResultAdded, ResultUpdated, RemoveAllResults, StatusRequested } from '../charts.actions';
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
  raceStatus$: Subscription;
  raceStarted = false;
  raceFinished$: Subscription;
  latest_time: number;
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
      if(finished) {
        this.socket.emit("finished");
        this.raceStarted = false;
        console.log("FINISHED")
        clearInterval(this.interval);
      }
    });

    this.store.dispatch(new StatusRequested());
    this.raceStatus$ = this.store.pipe(
      select(selectStatus),
      map(status => status)

    ).subscribe(status => {
      if(status.length > 0) {
        this.raceStarted = status[0].started;
        this.latest_time = status[0].start_time;
        this.clearTable(this.interval);
      }
    })

    this.socket.on('started').subscribe(
      data => {
        this.raceStarted = true;
      }
    );

    this.socket.on('currentData').subscribe(
      data => {
        //constant clock on reload
        const current_ts = new Date().getTime();
        const diff = current_ts - this.latest_time;
        console.log("1 ", diff, Math.ceil(diff/60000), this.timer)
        if(this.raceStarted) {
          this.startclock();
          this.min = Math.floor(diff/60000);
          this.sec = Math.floor(diff/1000 % 60);
          if (this.sec > 59) this.min += 1
          this.msec = 999;
          this.timer = diff;
          
        }
      }
    );

  }

  start(): void {
      this.clearTable(this.interval);
      this.store.dispatch(new RemoveAllResults());
      this.socket.emit('start');
      this.startclock();
  }

  startclock(): void {
    //start clock on press "start"
    this.interval = setInterval(() => {
      //console.log()
      this.timer++;
      this.msec += 1;
      //console.log(this.timer, this.min)
      if (this.timer % 6000 === 0) {
        this.min += 1;
        if (this.min > 59) {
          this.min = 0;
        }
      }
      if (this.timer % 100 === 0) {
        this.sec += 1;
        if (this.sec > 59) {
          console.log("59!")
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
