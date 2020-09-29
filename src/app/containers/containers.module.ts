import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainersComponent } from './containers.component';
import { CaseSurveillanceTestingComponent } from './surveillance/case-surveillance-testing/case-surveillance-testing.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MapSectionComponent } from './surveillance/map-section/map-section.component';
import { ConfirmedCasesAndDeathsSectionComponent } from './surveillance/confirmed-cases-and-deaths-section/confirmed-cases-and-deaths-section.component';
import { TestsConductedAndPositiveCasesComponent } from './surveillance/tests-conducted-and-positive-cases/tests-conducted-and-positive-cases.component';
import { SummaryTableComponent } from './surveillance/summary-table/summary-table.component';
import { LaboratoryOverallSummaryComponent } from './laboratory_tests/laboratory-overall-summary/laboratory-overall-summary.component';
import { TestsAndPositiveComponent } from './laboratory_tests/tests-and-positive/tests-and-positive.component';
import { PositiveTestsPerLabComponent } from './laboratory_tests/positive-tests-per-lab/positive-tests-per-lab.component';
import { TypeOfTetsPerLabComponent } from './laboratory_tests/type-of-tets-per-lab/type-of-tets-per-lab.component';
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
    LaboratoryOverallSummaryComponent,
    TestsAndPositiveComponent,
    PositiveTestsPerLabComponent,
    TypeOfTetsPerLabComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ContainersModule {}
