import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { omit } from 'lodash';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/reducers';
import { getConfiguration, getConfigurationList } from 'src/app/store/selectors/config.selectors';
@Component({
  selector: 'app-data-filter-dialog',
  templateUrl: './data-filter-dialog.component.html',
  styleUrls: ['./data-filter-dialog.component.scss'],
})
export class DataFilterDialogComponent implements OnInit {
  title = '';
  selectedItems = [];
  configurations$: Observable<any>;
  constructor(
    private store$: Store<State>,
    public dialogRef: MatDialogRef<DataFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.selectedItems = [];
    this.configurations$ = this.store$.pipe(select(getConfigurationList));
  }
  onDataUpdate(data: any, action: string) {
    if (action === 'CHANGE') {
      const updatedData = data && data.changed ? omit(data, 'changed') : data;
      this.selectedItems =
        updatedData && updatedData.items
          ? updatedData.items
          : this.selectedItems;
      console.log({ updatedData });
      this.dialogRef.close('One');
    } else {
      this.dialogRef.close();
    }
  }
  showFilter(item) {
    this.selectedItems = item && item.id ? [...[], item.id] : [];
  }
}
