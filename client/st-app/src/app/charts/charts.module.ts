import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromCharts from './charts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChartsEffects } from './charts.effects';
import { ChartsService } from './services/charts.service';

export const coursesRoutes: Routes = [
  {
      path: '',
      component: HomeComponent

  }
];


@NgModule({
  declarations: [ChartComponent, HomeComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    StoreModule.forFeature('charts', fromCharts.ChartsReducer),
    EffectsModule.forFeature([ChartsEffects])
  ],
  exports: [
    MatTabsModule,
    MatTableModule,
    ChartComponent,
    HomeComponent
  ],
  providers: [
    ChartsService
  ]
})
export class ChartsModule { }
