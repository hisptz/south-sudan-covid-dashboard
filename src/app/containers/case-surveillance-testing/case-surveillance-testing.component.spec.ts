import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSurveillanceTestingComponent } from './case-surveillance-testing.component';

describe('CaseSurveillanceTestingComponent', () => {
  let component: CaseSurveillanceTestingComponent;
  let fixture: ComponentFixture<CaseSurveillanceTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseSurveillanceTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseSurveillanceTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
