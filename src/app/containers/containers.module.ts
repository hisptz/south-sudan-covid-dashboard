import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainersComponent } from './containers.component';
import { CaseSurveillanceTestingComponent } from './case-surveillance-testing/case-surveillance-testing.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MapSectctionComponent } from './map-sectction/map-sectction.component';

const routes: Routes = [
  {
    path: '',
    component: ContainersComponent
  }
];

@NgModule({
  declarations: [ContainersComponent, CaseSurveillanceTestingComponent, MapSectctionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ContainersModule { }
