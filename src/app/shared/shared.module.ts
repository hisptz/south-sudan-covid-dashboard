import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ChartModule } from 'angular-highcharts';
import { GraphComponent } from './components/graph/graph.component';
import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { SelectionFiltersMenuComponent } from './components/selection-filters-menu/selection-filters-menu.component';
import { DataFilterDialogComponent } from './dialogs/data-filter-dialog/data-filter-dialog.component';
import { OrgUnitFilterDialogComponent } from './dialogs/org-unit-filter-dialog/org-unit-filter-dialog.component';
import { PeriodFilterDialogComponent } from './dialogs/period-filter-dialog/period-filter-dialog.component';
import { SelectionFiltersComponent } from './dialogs/selection-filters/selection-filters.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MapVisualizationComponent } from './components/map-visualization/map-visualization.component';
import {MatRippleModule} from '@angular/material/core';
import { MetadataFilterComponent } from './components/metadata-filter/metadata-filter.component';
import { OrgUnitFilterComponent } from './components/org-unit-filter/org-unit-filter.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DataFilterComponent } from './components/data-filter/data-filter.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    GraphComponent,
    SelectionFiltersMenuComponent,
    DataFilterDialogComponent,
    OrgUnitFilterDialogComponent,
    PeriodFilterDialogComponent,
    SelectionFiltersComponent,
    MapVisualizationComponent,
    MetadataFilterComponent,
    OrgUnitFilterComponent,
    BarChartComponent,
    DataFilterComponent,
  ],
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
    NgxDhis2OrgUnitFilterModule,
    MatExpansionModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule
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
    SelectionFiltersMenuComponent,
    DataFilterDialogComponent,
    OrgUnitFilterDialogComponent,
    PeriodFilterDialogComponent,
    MatExpansionModule,
    SelectionFiltersComponent,
    MatTabsModule,
    MatProgressSpinnerModule,
    MapVisualizationComponent,
    MatRippleModule,
    BarChartComponent,
    DataFilterComponent,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    DataFilterDialogComponent,
    OrgUnitFilterDialogComponent,
    PeriodFilterDialogComponent,
    SelectionFiltersComponent
  ],
})
export class SharedModule {}
