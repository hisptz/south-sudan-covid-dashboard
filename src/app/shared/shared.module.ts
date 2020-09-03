import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {  ChartModule } from 'angular-highcharts';
import { GraphComponent } from './components/graph/graph.component';;
import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { SelectionFiltersMenuComponent } from './components/selection-filters-menu/selection-filters-menu.component';
@NgModule({
  declarations: [GraphComponent, SelectionFiltersMenuComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    ChartModule,
    NgxDhis2DataFilterModule,
    NgxDhis2PeriodFilterModule,
    NgxDhis2OrgUnitFilterModule
  ],
  exports: [
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    ChartModule,
    GraphComponent,
    NgxDhis2DataFilterModule,
    NgxDhis2PeriodFilterModule,
    NgxDhis2OrgUnitFilterModule,
    SelectionFiltersMenuComponent
  ],
  entryComponents: []
})
export class SharedModule {}
