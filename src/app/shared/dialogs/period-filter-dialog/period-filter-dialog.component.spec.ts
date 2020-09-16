import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodFilterDialogComponent } from './period-filter-dialog.component';

describe('PeriodFilterDialogComponent', () => {
  let component: PeriodFilterDialogComponent;
  let fixture: ComponentFixture<PeriodFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
