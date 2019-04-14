import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {MatButtonModule} from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { ChartsEffects } from './charts.effects';
import { ChartsService } from './services/charts.service';
import { chartsReducer } from './charts.reducer';
import { resultsReducer } from './results.reducer';
import { SocketService } from './services/socket.service';
import { FormatstampPipe } from '../shared/formatstamp.pipe';
import { statusReducer } from './status.reducer';

export const chartsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/sportsmen'
  },
  {
    path: 'sportsmen/:results',
    component: ChartComponent
  },
  {
    path: 'sportsmen',
    component: ChartComponent
  }
];


@NgModule({
  declarations: [ChartComponent, HomeComponent, FormatstampPipe],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    RouterModule.forChild(chartsRoutes),
    StoreModule.forFeature('charts', chartsReducer),
    StoreModule.forFeature('results', resultsReducer),
    StoreModule.forFeature('status', statusReducer),
    EffectsModule.forFeature([ChartsEffects])
  ],
  exports: [
    MatTabsModule,
    MatTableModule,
    ChartComponent,
    HomeComponent,
    FormatstampPipe
  ],
  providers: [
    ChartsService,
    SocketService
  ]
})
export class ChartsModule { }
