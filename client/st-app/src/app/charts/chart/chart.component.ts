import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from '../services/socket.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ResultAdded, ResultUpdated } from '../charts.actions';




@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  @Input() charts$: Observable<any[]>;
  @Input() columnsToDisplay;
  @Input() isResults;

  constructor(private socket: SocketService, private store: Store<AppState>) {}

  ngOnInit() {
    this.socket.on('currentData')
    .subscribe(
      data => {
          this.charts$ = data;
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
}
