import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataFilterDialogComponent } from '../shared/dialogs/data-filter-dialog/data-filter-dialog.component';
import { State } from '../store/reducers';
import { getConfiguration, getConfigurationLoadedStatus, getConfigurationLoadingStatus } from '../store/selectors/config.selectors';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss'],
})
export class ContainersComponent implements OnInit {
  configLoadingStatus$: Observable<boolean>;
  configLoadedStatus$: Observable<boolean>;
  config$: Observable<any>;

  constructor(private store: Store<State>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.configLoadingStatus$ = this.store.pipe(
      select(getConfigurationLoadingStatus)
    );
    this.configLoadedStatus$ = this.store.pipe(
      select(getConfigurationLoadedStatus)
    );
    this.config$ = this.store.select(getConfiguration);
  }
  openMetadataDialog() {
    const dialogRef = this.dialog.open(DataFilterDialogComponent, {
      width: '1500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
