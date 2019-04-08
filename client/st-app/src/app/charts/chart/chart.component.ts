import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Sportsmen } from '../model/sportmen.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

export interface PeriodicElement {
  name: string;
  lastname: string;
  finishing: string;
  crossed: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {lastname: 'Chernetsov', name: 'Eugene', finishing: '00:17:987', crossed: '00:27:123'},
  {lastname: 'Chernetsov', name: 'Eugene', finishing: '00:17:987', crossed: '00:27:123'}
];

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  columnsToDisplay: string[] = ['sportsmanName', 'sportsmanLastname', 'finishing'];
  @Input() charts;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
 
  }

}
