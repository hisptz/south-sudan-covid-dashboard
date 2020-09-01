import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsConductedAndPositiveCasesComponent } from './tests-conducted-and-positive-cases.component';

describe('TestsConductedAndPositiveCasesComponent', () => {
  let component: TestsConductedAndPositiveCasesComponent;
  let fixture: ComponentFixture<TestsConductedAndPositiveCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsConductedAndPositiveCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsConductedAndPositiveCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
