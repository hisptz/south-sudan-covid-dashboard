import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveTestsPerLabComponent } from './positive-tests-per-lab.component';

describe('PositiveTestsPerLabComponent', () => {
  let component: PositiveTestsPerLabComponent;
  let fixture: ComponentFixture<PositiveTestsPerLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositiveTestsPerLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositiveTestsPerLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
