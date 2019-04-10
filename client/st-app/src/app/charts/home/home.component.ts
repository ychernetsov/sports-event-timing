import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sportsmen } from '../model/sportmen.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectAllSportsmen, selectAllResults } from '../charts.selectors';
import { AllSportsmenRequested, AllResultsRequested, ResultAdded, ResultUpdated } from '../charts.actions';
import { Results } from '../model/results.model';
import { SocketService } from '../services/socket.service';
import { ChartsService } from '../services/charts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sportsmen$: Observable<Sportsmen[]>;
  results$: Observable<Results[]>;
  forSportsmen = ['start_number', 'sportsmanName', 'sportsmanLastname'];
  forResults = ['start_number', 'sportsmanName', 'sportsmanLastname', 'finishing', 'crossed'];
  constructor(private socket: SocketService, private store: Store<AppState>, private chartsService: ChartsService) { }

  ngOnInit() {

    this.store.dispatch(new AllSportsmenRequested())
    this.sportsmen$ = this.store.pipe(
      select(selectAllSportsmen)
    )

    this.store.dispatch(new AllResultsRequested())
    this.results$ = this.store.pipe(
      select(selectAllResults)
    )

    this.socket.on('currentData')
    .subscribe(
      data => {
          this.results$ = data;
      }
    )

    this.socket.on("saveResult").subscribe(
      data => {
          console.log("Res saved")
          const resultObj = {
            "id": data.sportsman._id,
            "finishing": data.finishing, 
            "crossed": data.crossed, 
            "name": data.sportsman.name,
            "lastname": data.sportsman.lastname,
            "start_number": data.sportsman.start_number
          }

          this.store.dispatch(new ResultAdded(resultObj));
        
      }
    );

    this.socket.on("updateResult").subscribe(
      data => {
        const resultObj = {
          "id": data.sportsman._id,
          "finishing": data.finishing, 
          "crossed": data.crossed, 
          "name": data.sportsman.name,
          "lastname": data.sportsman.lastname,
          "start_number": data.sportsman.start_number
        };

        this.store.dispatch(new ResultUpdated(data.sportsman._id, resultObj));

      }
    )
  }

  start() {
    //console.log("emit start")
    //this.socket.on("connect")
      this.socket.emit('start')
  
    
    //this.chartsService.startRace()
  }

}
