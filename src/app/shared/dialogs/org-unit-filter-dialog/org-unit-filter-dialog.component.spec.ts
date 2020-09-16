import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgUnitFilterDialogComponent } from './org-unit-filter-dialog.component';

describe('OrgUnitFilterDialogComponent', () => {
  let component: OrgUnitFilterDialogComponent;
  let fixture: ComponentFixture<OrgUnitFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgUnitFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgUnitFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
