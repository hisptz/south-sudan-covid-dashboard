import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedCasesAndDeathsSectionComponent } from './confirmed-cases-and-deaths-section.component';

describe('ConfirmedCasesAndDeathsSectionComponent', () => {
  let component: ConfirmedCasesAndDeathsSectionComponent;
  let fixture: ComponentFixture<ConfirmedCasesAndDeathsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmedCasesAndDeathsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedCasesAndDeathsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
