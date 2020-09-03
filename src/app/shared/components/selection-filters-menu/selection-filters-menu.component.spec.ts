import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionFiltersMenuComponent } from './selection-filters-menu.component';

describe('SelectionFiltersMenuComponent', () => {
  let component: SelectionFiltersMenuComponent;
  let fixture: ComponentFixture<SelectionFiltersMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionFiltersMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionFiltersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
