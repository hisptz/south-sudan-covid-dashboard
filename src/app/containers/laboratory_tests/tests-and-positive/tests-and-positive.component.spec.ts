import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsAndPositiveComponent } from './tests-and-positive.component';

describe('TestsAndPositiveComponent', () => {
  let component: TestsAndPositiveComponent;
  let fixture: ComponentFixture<TestsAndPositiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsAndPositiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsAndPositiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
