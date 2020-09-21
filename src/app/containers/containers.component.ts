import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.configLoadingStatus$ = this.store.pipe(
      select(getConfigurationLoadingStatus)
    );
    this.configLoadedStatus$ = this.store.pipe(
      select(getConfigurationLoadedStatus)
    );
    this.config$ = this.store.select(getConfiguration);
  }
}
