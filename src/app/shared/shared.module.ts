import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule { }
