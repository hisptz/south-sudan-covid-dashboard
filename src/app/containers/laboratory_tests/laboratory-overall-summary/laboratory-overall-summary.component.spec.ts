import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryOverallSummaryComponent } from './laboratory-overall-summary.component';

describe('LaboratoryOverallSummaryComponent', () => {
  let component: LaboratoryOverallSummaryComponent;
  let fixture: ComponentFixture<LaboratoryOverallSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryOverallSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryOverallSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
