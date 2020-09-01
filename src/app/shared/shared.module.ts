import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {  ChartModule } from 'angular-highcharts';
import { GraphComponent } from './components/graph/graph.component';
@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    ChartModule,
  ],
  exports: [
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    ChartModule,
    GraphComponent
  ],
})
export class SharedModule {}
