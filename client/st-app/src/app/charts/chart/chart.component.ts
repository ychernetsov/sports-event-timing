import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  @Input() charts: Observable<any[]>;
  @Input() columnsToDisplay;
  @Input() isResults;

  constructor() {}

  ngOnInit() {

  }
}
