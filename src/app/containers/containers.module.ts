import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainersComponent } from './containers.component';
import { CaseSurveillanceTestingComponent } from './case-surveillance-testing/case-surveillance-testing.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MapSectionComponent } from './map-section/map-section.component';
import { ConfirmedCasesAndDeathsSectionComponent } from './confirmed-cases-and-deaths-section/confirmed-cases-and-deaths-section.component';
import { TestsConductedAndPositiveCasesComponent } from './tests-conducted-and-positive-cases/tests-conducted-and-positive-cases.component';
import { SummaryTableComponent } from './summary-table/summary-table.component';
const routes: Routes = [
  {
    path: '',
    component: ContainersComponent,
  },
];

@NgModule({
  declarations: [
    ContainersComponent,
    CaseSurveillanceTestingComponent,
    MapSectionComponent,
    ConfirmedCasesAndDeathsSectionComponent,
    TestsConductedAndPositiveCasesComponent,
    SummaryTableComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ContainersModule {}
